const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_FETCH_LATEST_DRAWING_COMMAND,
	TOPIC_OF_DRAWING_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_SUCCESS,
	REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_SKIP,
	REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_RISK,
	REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	getPrimaryOpenedDrawingsByLotteryId,
	getLatestFetchedDrawingByLotteryId,
	getDrawingsByLotteryId,
	upsertDrawing,
	DRAWING_PROJECTIONS,
} = require("../services/lottery.system");
const {
	ConflictError,
} = require("ljit-error");
const {
	DRAWING_DUPLICATED_OPENCODE,
	DRAWING_EARLY_OPENED,
} = require("../lib/error/code");
const {
	ENUM_DRAWING_STATUS,
} = require("../lib/enum");

function subscribe() {
	emitter.on(TOPIC_OF_FETCH_LATEST_DRAWING_COMMAND, handleFetchDrawingsCommand);
}

async function handleFetchDrawingsCommand({ requestId, lottery }) {
	global.LOGGER.debug(requestId, TOPIC_OF_FETCH_LATEST_DRAWING_COMMAND, lottery.code);

	try {
		const latestFetchedDrawing = await getLatestFetchedDrawingByLotteryId(lottery.id);

		const issue = latestFetchedDrawing !== null ? latestFetchedDrawing.issue : 0;

		const newComingDrawings = await getPrimaryOpenedDrawingsByLotteryId(lottery.id, { issue, requestId, limit: 1 });

		if (!newComingDrawings.length) {
			throw new RangeError(`${lottery.code} 0 fetched drawings, skip`);
		}

		global.LOGGER.info(requestId, TOPIC_OF_FETCH_LATEST_DRAWING_COMMAND, lottery.code, newComingDrawings[0].issue, newComingDrawings[0].opencode);

		const drawings = await getDrawingsByLotteryId(lottery.id, {
			limit: 10,
			projections: DRAWING_PROJECTIONS.OPENCODE,
		});

		const row = {
			lotteryId: newComingDrawings[0].lottery.id,
			issue: newComingDrawings[0].issue,
			index: newComingDrawings[0].index,
			opencode: newComingDrawings[0].opencode,
			startedAt: newComingDrawings[0].startedAt,
			closedAt: newComingDrawings[0].closedAt,
			openedAt: newComingDrawings[0].openedAt,
			status: confirmDrawingStatus(drawings, newComingDrawings[0]),
			isFetched: true,
		};

		await upsertDrawing(row);

		if (row.status === ENUM_DRAWING_STATUS.DUPLICATED) {
			throw new ConflictError(
				DRAWING_DUPLICATED_OPENCODE.MESSAGE,
				DRAWING_DUPLICATED_OPENCODE.CODE
			);
		}

		if (row.status === ENUM_DRAWING_STATUS.EARLY_OPENED) {
			throw new ConflictError(
				DRAWING_EARLY_OPENED.MESSAGE,
				DRAWING_EARLY_OPENED.CODE
			);
		}

		emitter.emit(TOPIC_OF_DRAWING_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_SUCCESS,
			payload: { lottery },
		});
	} catch (error) {
		if (error instanceof RangeError) {
			emitter.emit(TOPIC_OF_DRAWING_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_SKIP,
				payload: { lottery },
			});
		} else if (error instanceof ConflictError) {
			global.LOGGER.warn(requestId, TOPIC_OF_FETCH_LATEST_DRAWING_COMMAND, error.formatStack(), `(${lottery.code})`);

			emitter.emit(TOPIC_OF_DRAWING_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_RISK,
				payload: { lottery },
			});
		} else {
			global.LOGGER.warn(requestId, TOPIC_OF_FETCH_LATEST_DRAWING_COMMAND, error.formatStack(), `(${lottery.code})`);

			emitter.emit(TOPIC_OF_DRAWING_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_FAILED,
				payload: { lottery },
			});
		}
	}
}

function confirmDrawingStatus(drawings, newComingDrawing) {
	const openedAt = new Date(newComingDrawing.openedAt);

	if (new Date() < openedAt) {
		return ENUM_DRAWING_STATUS.EARLY_OPENED;
	}

	const isDuplicated = drawings.some(drawing => drawing.opencode === newComingDrawing.opencode);

	if (isDuplicated) {
		return ENUM_DRAWING_STATUS.DUPLICATED;
	}

	return ENUM_DRAWING_STATUS.REWARD_GRANTING;
}

module.exports = {
	subscribe,
};

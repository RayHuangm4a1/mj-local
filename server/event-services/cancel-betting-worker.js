const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_CANCEL_BETTINGS_COMMAND,
	TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_CANCEL_BETTINGS_COMMAND_SKIP,
	REPLY_OF_CANCEL_BETTINGS_COMMAND_SUCCESS,
	REPLY_OF_CANCEL_BETTINGS_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	getEarliestCancelingDrawing,
	setDrawingFromCancelingToCanceledByLotteryIdAndIssue,
} = require("../services/lottery.system");
const {
	cancelSeriesBettings,
} = require("../services/betting.system");

function subscribe() {
	emitter.on(TOPIC_OF_CANCEL_BETTINGS_COMMAND, handleCancelBettingsCommand);
}

async function handleCancelBettingsCommand({ requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_CANCEL_BETTINGS_COMMAND);

	let drawing = null;

	try {
		drawing = await getEarliestCancelingDrawing();

		if (drawing === null) {
			throw new RangeError("without cancel drawing, skip.");
		}
	} catch (error) {
		if (error instanceof RangeError) {
			emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_CANCEL_BETTINGS_COMMAND_SKIP,
				payload: { drawing },
			});
		} else {
			global.LOGGER.error(requestId, TOPIC_OF_CANCEL_BETTINGS_COMMAND, error.formatStack());

			emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_CANCEL_BETTINGS_COMMAND_FAILED,
				payload: { drawing },
			});
		}

		return;
	}

	global.LOGGER.info(requestId, TOPIC_OF_CANCEL_BETTINGS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode);

	try {
		const { bettings } = await cancelSeriesBettings({ drawing });

		global.LOGGER.info(requestId, TOPIC_OF_CANCEL_BETTINGS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, `${bettings.length} bettings canceled`);

		await setDrawingFromCancelingToCanceledByLotteryIdAndIssue(drawing.lotteryId, drawing.issue);

		emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_CANCEL_BETTINGS_COMMAND_SUCCESS,
			payload: { drawing },
		});
	} catch (error) {
		global.LOGGER.error(requestId, TOPIC_OF_CANCEL_BETTINGS_COMMAND, error.formatStack());

		emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_CANCEL_BETTINGS_COMMAND_FAILED,
			payload: { drawing },
		});
	}
}

module.exports = {
	subscribe,
};

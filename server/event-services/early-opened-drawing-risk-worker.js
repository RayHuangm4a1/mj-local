const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND,
	TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND_SUCCESS,
	REPLY_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND_SKIP,
	REPLY_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	DRAWING_PROJECTIONS,

	getEarlyOpenedDrawing,
	setDrawingFromEarlyOpenedToClosedByLotteryIdAndIssue,
	setPrimaryLotteryMaintenanceById,
} = require("../services/lottery.system");
const {
	createManagementLog,
} = require("../services/management-log.system");
const {
	NotFoundError,
} = require("ljit-error");
const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
	ENUM_MANAGEMENT_STATUS,
} = require("../lib/enum");

function subscribe() {
	emitter.on(TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND, handleCloseLotteryForEarlyOpenedDrawingCommand);
}

async function handleCloseLotteryForEarlyOpenedDrawingCommand({ requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND);

	let drawing;

	try {
		drawing = await getEarlyOpenedDrawing({ projections: DRAWING_PROJECTIONS.EARLY_OPENED });

		if (drawing === null) {
			throw new RangeError('0 fetched drawings, skip');
		}
	} catch (error) {
		drawing = { issue: null, lotteryId: null };

		if (error instanceof RangeError) {
			emitCommandSkipEvent(requestId, drawing);
		} else {
			global.LOGGER.warn(requestId, TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND, error.formatStack());

			emitCommandFailedEvent(requestId, drawing);
		}

		return;
	}

	global.LOGGER.info(requestId, TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND, drawing.issue, drawing.lotteryId);

	try {
		//TODO: 用更合適的方式取得jwt
		await setPrimaryLotteryMaintenanceById(drawing.lotteryId, {
			requestId,
			jwt: global.ADMIN_JWT,
		});

		const managementLog = {
			operatorId: 2,
			operatorUsername: "admin",
			associateId: drawing.lotteryId,
			associateName: null,
			type: ENUM_MANAGEMENT_TYPE.LOTTERY,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			status: ENUM_MANAGEMENT_STATUS.SUCCESS,
			description: `${drawing.issue}提早开奖，关闭彩票状态`,
		};

		await createManagementLog(managementLog);
	} catch (error) {
		if (error instanceof NotFoundError) {
			global.LOGGER.debug(requestId, "NotFoundError", TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_REPLY_EVENT, drawing.issue, drawing.lotteryId);
		} else {
			global.LOGGER.warn(requestId, TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND, error.formatStack());

			emitCommandFailedEvent(requestId, drawing);

			return;
		}
	}

	try {
		await setDrawingFromEarlyOpenedToClosedByLotteryIdAndIssue(drawing.lotteryId, drawing.issue);

		emitCommandSuccessEvent(requestId, drawing);
	} catch (error) {
		global.LOGGER.warn(requestId, TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND, error.formatStack());

		emitCommandFailedEvent(requestId, drawing);
	}
}

function emitCommandSkipEvent(requestId, drawing) {
	emitter.emit(TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_REPLY_EVENT, {
		requestId,
		type: REPLY_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND_SKIP,
		payload: { drawing },
	});
}

function emitCommandSuccessEvent(requestId, drawing) {
	emitter.emit(TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_REPLY_EVENT, {
		requestId,
		type: REPLY_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND_SUCCESS,
		payload: { drawing },
	});
}

function emitCommandFailedEvent(requestId, drawing) {
	emitter.emit(TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_REPLY_EVENT, {
		requestId,
		type: REPLY_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND_FAILED,
		payload: { drawing },
	});
}

module.exports = {
	subscribe,
};

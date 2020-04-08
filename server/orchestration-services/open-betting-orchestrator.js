const uuidv4 = require('uuid/v4');
const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_OPEN_BETTINGS_COMMAND,
	TOPIC_OF_GRANT_COMMISSIONS_COMMAND,
	TOPIC_OF_TERMINATE_TRACES_COMMAND,
	TOPIC_OF_CANCEL_BETTINGS_COMMAND,
	TOPIC_OF_RENEW_BETTINGS_COMMAND,
	TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_OPEN_BETTINGS_COMMAND_SKIP,
	REPLY_OF_OPEN_BETTINGS_COMMAND_SUCCESS,
	REPLY_OF_OPEN_BETTINGS_COMMAND_FAILED,
	REPLY_OF_GRANT_COMMISSIONS_COMMAND_SKIP,
	REPLY_OF_GRANT_COMMISSIONS_COMMAND_SUCCESS,
	REPLY_OF_GRANT_COMMISSIONS_COMMAND_FAILED,
	REPLY_OF_TERMINATE_TRACES_COMMAND_SKIP,
	REPLY_OF_TERMINATE_TRACES_COMMAND_SUCCESS,
	REPLY_OF_TERMINATE_TRACES_COMMAND_FAILED,
	REPLY_OF_CANCEL_BETTINGS_COMMAND_SUCCESS,
	REPLY_OF_CANCEL_BETTINGS_COMMAND_SKIP,
	REPLY_OF_CANCEL_BETTINGS_COMMAND_FAILED,
	REPLY_OF_RENEW_BETTINGS_COMMAND_SUCCESS,
	REPLY_OF_RENEW_BETTINGS_COMMAND_SKIP,
	REPLY_OF_RENEW_BETTINGS_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const { get } = require("ljit-collection");

function start() {
	if (global.IS_OPEN_BETTING_CRONJOB_FINISHED) {
		global.IS_OPEN_BETTING_CRONJOB_FINISHED = false;

		emitter.emit(TOPIC_OF_OPEN_BETTINGS_COMMAND, {
			requestId: uuidv4(),
		});
	}
}

function subscribe() {
	emitter.on(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, (event) => {
		try {
			global.LOGGER.debug(event.requestId, TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, event.type, get(event, "event.payload.drawing.lotteryId"));

			switch (event.type) {
				case REPLY_OF_OPEN_BETTINGS_COMMAND_SUCCESS:
				case REPLY_OF_OPEN_BETTINGS_COMMAND_SKIP:
				case REPLY_OF_OPEN_BETTINGS_COMMAND_FAILED:
					sendGrantCommissionsCommand(event);
					break;
				case REPLY_OF_GRANT_COMMISSIONS_COMMAND_SUCCESS:
				case REPLY_OF_GRANT_COMMISSIONS_COMMAND_SKIP:
				case REPLY_OF_GRANT_COMMISSIONS_COMMAND_FAILED:
					sendTerminateTracesCommand(event);
					break;
				case REPLY_OF_TERMINATE_TRACES_COMMAND_SKIP:
				case REPLY_OF_TERMINATE_TRACES_COMMAND_SUCCESS:
				case REPLY_OF_TERMINATE_TRACES_COMMAND_FAILED:
					sendCancelBettingsCommand(event);
					break;
				case REPLY_OF_CANCEL_BETTINGS_COMMAND_SUCCESS:
				case REPLY_OF_CANCEL_BETTINGS_COMMAND_SKIP:
				case REPLY_OF_CANCEL_BETTINGS_COMMAND_FAILED:
					sendRenewBettingsCommand(event);
					break;
				case REPLY_OF_RENEW_BETTINGS_COMMAND_SUCCESS:
				case REPLY_OF_RENEW_BETTINGS_COMMAND_SKIP:
				case REPLY_OF_RENEW_BETTINGS_COMMAND_FAILED:
					global.IS_OPEN_BETTING_CRONJOB_FINISHED = true;
					break;
				default:
					break;
			}
		} catch (error) {
			global.LOGGER.error(error.stack);
		}
	});
}

function sendGrantCommissionsCommand(event) {
	const { requestId } = event;

	emitter.emit(TOPIC_OF_GRANT_COMMISSIONS_COMMAND, {
		requestId,
	});
}

function sendTerminateTracesCommand(event) {
	const { requestId } = event;

	emitter.emit(TOPIC_OF_TERMINATE_TRACES_COMMAND, {
		requestId,
	});
}

function sendCancelBettingsCommand(event) {
	const { requestId } = event;

	emitter.emit(TOPIC_OF_CANCEL_BETTINGS_COMMAND, {
		requestId,
	});
}

function sendRenewBettingsCommand(event) {
	const { requestId } = event;

	emitter.emit(TOPIC_OF_RENEW_BETTINGS_COMMAND, {
		requestId,
	});
}

module.exports = {
	start,
	subscribe,
};

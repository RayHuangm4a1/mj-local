const uuidv4 = require('uuid/v4');
const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_APPLY_AUTO_REMIT_COMMAND,
	TOPIC_OF_AUTO_REMIT_REPLY_EVENT,
	TOPIC_OF_REMIT_USING_BANK_COMMAND,
	TOPIC_OF_REMIT_USING_THIRD_PARTY_COMMAND,
} = require("../lib/event-topics");
const {
	REPLY_OF_APPLY_AUTO_REMIT_COMMAND_SUCCESS,
	REPLY_OF_APPLY_AUTO_REMIT_COMMAND_SKIP,
	REPLY_OF_APPLY_AUTO_REMIT_COMMAND_FAILED,

	REPLY_OF_REMIT_USING_BANK_COMMAND_SUCCESS,
	REPLY_OF_REMIT_USING_BANK_COMMAND_SKIP,
	REPLY_OF_REMIT_USING_BANK_COMMAND_FAILED,

	REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_SUCCESS,
	REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_SKIP,
	REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_FAILED,
} = require("../lib/event-reply-types");

function start() {
	if (global.IS_WITHDRAWAL_CRONJOB_FINISHED) {
		global.IS_WITHDRAWAL_CRONJOB_FINISHED = false;

		emitter.emit(TOPIC_OF_APPLY_AUTO_REMIT_COMMAND, {
			requestId: uuidv4(),
		});
	}
}

function subscribe() {
	emitter.on(TOPIC_OF_AUTO_REMIT_REPLY_EVENT, (event) => {
		try {
			global.LOGGER.debug(event.requestId, TOPIC_OF_AUTO_REMIT_REPLY_EVENT, event.type);

			switch (event.type) {
				case REPLY_OF_APPLY_AUTO_REMIT_COMMAND_SUCCESS:
				case REPLY_OF_APPLY_AUTO_REMIT_COMMAND_SKIP:
				case REPLY_OF_APPLY_AUTO_REMIT_COMMAND_FAILED:
					sendRemitUsingBankCommand(event);
					break;
				case REPLY_OF_REMIT_USING_BANK_COMMAND_SUCCESS:
				case REPLY_OF_REMIT_USING_BANK_COMMAND_SKIP:
				case REPLY_OF_REMIT_USING_BANK_COMMAND_FAILED:
					sendRemitUsingThirdPartyCommand(event);
					break;
				case REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_SUCCESS:
				case REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_SKIP:
				case REPLY_OF_REMIT_USING_THIRD_PARTY_COMMAND_FAILED:
					global.IS_WITHDRAWAL_CRONJOB_FINISHED = true;
					break;
				default:
					break;
			}
		} catch (error) {
			global.LOGGER.error(error.stack);
		}
	});
}

module.exports = {
	start,
	subscribe,
};

function sendRemitUsingBankCommand(event) {
	const { requestId } = event;

	emitter.emit(TOPIC_OF_REMIT_USING_BANK_COMMAND, {
		requestId,
	});
}

function sendRemitUsingThirdPartyCommand(event) {
	const { requestId } = event;

	emitter.emit(TOPIC_OF_REMIT_USING_THIRD_PARTY_COMMAND, {
		requestId,
	});
}

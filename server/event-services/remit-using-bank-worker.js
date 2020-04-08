const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_REMIT_USING_BANK_COMMAND,
	TOPIC_OF_AUTO_REMIT_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_REMIT_USING_BANK_COMMAND_SUCCESS,
} = require("../lib/event-reply-types");

function subscribe() {
	emitter.on(TOPIC_OF_REMIT_USING_BANK_COMMAND, handleRemitUsingBankCommand);
}

async function handleRemitUsingBankCommand({ requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_REMIT_USING_BANK_COMMAND);

	emitter.emit(TOPIC_OF_AUTO_REMIT_REPLY_EVENT, {
		requestId,
		type: REPLY_OF_REMIT_USING_BANK_COMMAND_SUCCESS,
	});
}

module.exports = {
	subscribe,
};

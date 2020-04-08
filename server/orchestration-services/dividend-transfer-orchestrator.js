const uuidv4 = require('uuid/v4');
const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_DIVIDEND_TRANSFER_COMMAND,
	TOPIC_OF_DIVIDEND_TRANSFER_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_DIVIDEND_TRANSFER_COMMAND_SUCCESS,
	REPLY_OF_DIVIDEND_TRANSFER_COMMAND_FAILED,
} = require("../lib/event-reply-types");

function start() {
	emitter.emit(TOPIC_OF_DIVIDEND_TRANSFER_COMMAND, { requestId: uuidv4() });
}

function subscribe() {
	emitter.on(TOPIC_OF_DIVIDEND_TRANSFER_REPLY_EVENT, (event) => {
		global.LOGGER.debug(event.requestId, TOPIC_OF_DIVIDEND_TRANSFER_REPLY_EVENT, event.type);

		switch (event.type) {
			case REPLY_OF_DIVIDEND_TRANSFER_COMMAND_SUCCESS:
			case REPLY_OF_DIVIDEND_TRANSFER_COMMAND_FAILED:
				break;
			default:
				break;
		}
	});
}

module.exports = {
	start,
	subscribe,
};

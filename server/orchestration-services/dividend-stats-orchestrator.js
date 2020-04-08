const uuidv4 = require('uuid/v4');
const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_DIVIDEND_STATS_COMMAND,
	TOPIC_OF_DIVIDEND_STATS_REPLY_EVENT,
	TOPIC_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND,
} = require("../lib/event-topics");
const {
	REPLY_OF_DIVIDEND_STATS_COMMAND_SUCCESS,
	REPLY_OF_DIVIDEND_STATS_COMMAND_FAILED,
	REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_SUCCESS,
	REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_SKIP,
	REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_FAILED,
} = require("../lib/event-reply-types");

function start() {
	emitter.emit(TOPIC_OF_DIVIDEND_STATS_COMMAND, { requestId: uuidv4() });
}

function subscribe() {
	emitter.on(TOPIC_OF_DIVIDEND_STATS_REPLY_EVENT, (event) => {
		global.LOGGER.debug(event.requestId, TOPIC_OF_DIVIDEND_STATS_REPLY_EVENT, `receive event: ${event.type}`);

		switch (event.type) {
			case REPLY_OF_DIVIDEND_STATS_COMMAND_SUCCESS:
				sendGrantZhaoshangDividendsCommand(event);
				break;
			case REPLY_OF_DIVIDEND_STATS_COMMAND_FAILED:
			case REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_SUCCESS:
			case REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_SKIP:
			case REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_FAILED:
				break;
			default:
				break;
		}
	});
}

function sendGrantZhaoshangDividendsCommand(event) {
	const { requestId } = event;

	emitter.emit(TOPIC_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND, {
		requestId,
	});
}

module.exports = {
	start,
	subscribe,
};

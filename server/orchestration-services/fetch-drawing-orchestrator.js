const uuidv4 = require('uuid/v4');
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
	getPrimaryLotteries,
} = require("../services/lottery.system");

async function start() {
	try {
		const lotteries = await getPrimaryLotteries({ force: true, requestId: uuidv4() });

		lotteries.forEach(lottery => {
			emitter.emit(TOPIC_OF_FETCH_LATEST_DRAWING_COMMAND, {
				lottery,
				requestId: uuidv4(),
			});
		});
	} catch (error) {
		global.LOGGER.error(error.stack);
	}
}

function subscribe() {
	emitter.on(TOPIC_OF_DRAWING_REPLY_EVENT, (event) => {
		try {
			global.LOGGER.debug(event.requestId, TOPIC_OF_DRAWING_REPLY_EVENT, event.type, event.payload.lottery.code);

			switch (event.type) {
				case REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_SUCCESS:
				case REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_RISK:
				case REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_SKIP:
				case REPLY_OF_FETCH_LATEST_DRAWING_COMMAND_FAILED:
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

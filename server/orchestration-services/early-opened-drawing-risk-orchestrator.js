const uuidv4 = require("uuid/v4");
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

async function start() {
	if (global.IS_EARLY_OPENED_DRAWING_RISK_CRONJOB_FINISHED) {
		global.IS_EARLY_OPENED_DRAWING_RISK_CRONJOB_FINISHED = false;
		emitter.emit(TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND, { requestId: uuidv4() });
	}
}

function subscribe() {
	emitter.on(TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_REPLY_EVENT, (event) => {
		const { issue, lotteryId } = event.payload.drawing;

		global.LOGGER.debug(event.requestId, TOPIC_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_REPLY_EVENT, event.type, issue, lotteryId);

		switch (event.type) {
			case REPLY_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND_SUCCESS:
			case REPLY_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND_SKIP:
			case REPLY_OF_CLOSE_LOTTERY_FOR_EARLY_OPENED_DRAWING_COMMAND_FAILED:
				global.IS_EARLY_OPENED_DRAWING_RISK_CRONJOB_FINISHED = true;
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

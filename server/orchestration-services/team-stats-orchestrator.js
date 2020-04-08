const uuidv4 = require('uuid/v4');
const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_TEAM_BONUS_STATS_COMMAND,
	TOPIC_OF_TEAM_STATS_COMMAND,
	TOPIC_OF_TEAM_STATS_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_TEAM_BONUS_STATS_COMMAND_SUCCESS,
	REPLY_OF_TEAM_BONUS_STATS_COMMAND_FAILED,
	REPLY_OF_TEAM_STATS_COMMAND_SUCCESS,
	REPLY_OF_TEAM_STATS_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	getDateBeforeNDays,
} = require("../lib/date");

async function start(today) {
	if (global.IS_TEAM_STATS_CRONJOB_FINISHED) {
		global.IS_TEAM_STATS_CRONJOB_FINISHED = false;

		const date = today ? new Date() : getDateBeforeNDays(1);

		emitter.emit(TOPIC_OF_TEAM_BONUS_STATS_COMMAND, {
			date,
			requestId: uuidv4(),
		});
	}
}

function subscribe() {
	emitter.on(TOPIC_OF_TEAM_STATS_REPLY_EVENT, (event) => {
		try {
			global.LOGGER.debug(event.requestId, TOPIC_OF_TEAM_STATS_REPLY_EVENT, event.type);

			switch (event.type) {
				case REPLY_OF_TEAM_BONUS_STATS_COMMAND_SUCCESS:
				case REPLY_OF_TEAM_BONUS_STATS_COMMAND_FAILED:
					sendTeamStatsCommand(event);
					break;
				case REPLY_OF_TEAM_STATS_COMMAND_SUCCESS:
				case REPLY_OF_TEAM_STATS_COMMAND_FAILED:
					global.IS_TEAM_STATS_CRONJOB_FINISHED = true;
					break;
				default:
					break;
			}
		} catch (error) {
			global.LOGGER.error(error.stack);
		}
	});
}

function sendTeamStatsCommand(event) {
	const { requestId } = event;

	emitter.emit(TOPIC_OF_TEAM_STATS_COMMAND, {
		date: event.payload.date,
		requestId,
	});
}

module.exports = {
	start,
	subscribe,
};

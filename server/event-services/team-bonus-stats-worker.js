const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_TEAM_BONUS_STATS_COMMAND,
	TOPIC_OF_TEAM_STATS_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_TEAM_BONUS_STATS_COMMAND_SUCCESS,
	REPLY_OF_TEAM_BONUS_STATS_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	doSeriesTeamBonusStats,
} = require("../services/stats.system");

function subscribe() {
	emitter.on(TOPIC_OF_TEAM_BONUS_STATS_COMMAND, handleTeamBonusStatsCommand);
}

async function handleTeamBonusStatsCommand({ date, requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_TEAM_BONUS_STATS_COMMAND);

	try {
		const userBonusLogs = await doSeriesTeamBonusStats();

		global.LOGGER.info(requestId, TOPIC_OF_TEAM_BONUS_STATS_COMMAND, `${userBonusLogs.length} user bonus logs processed`);

		emitter.emit(TOPIC_OF_TEAM_STATS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_TEAM_BONUS_STATS_COMMAND_SUCCESS,
			payload: { date },
		});
	} catch (error) {
		global.LOGGER.error(requestId, TOPIC_OF_TEAM_BONUS_STATS_COMMAND, error.formatStack());

		emitter.emit(TOPIC_OF_TEAM_STATS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_TEAM_BONUS_STATS_COMMAND_FAILED,
			payload: { date },
		});
	}
}

module.exports = {
	subscribe,
};

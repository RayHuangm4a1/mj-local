const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_TEAM_STATS_COMMAND,
	TOPIC_OF_TEAM_STATS_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_TEAM_STATS_COMMAND_SUCCESS,
	REPLY_OF_TEAM_STATS_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	generateStatsDateString,
} = require("../lib/date");
const {
	getPlatform,
} = require("../services/platform.system");
const {
	doTeamStats,
} = require("../services/stats.system");

function subscribe() {
	emitter.on(TOPIC_OF_TEAM_STATS_COMMAND, handleTeamStatsCommand);
}

async function handleTeamStatsCommand({ date, requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_TEAM_STATS_COMMAND);

	try {
		const dateString = generateStatsDateString(date);
		const platform = await getPlatform();

		const { teamDailyStatses, teamStatses } = await doTeamStats({ date, platform });

		global.LOGGER.debug(requestId, TOPIC_OF_TEAM_STATS_COMMAND, "team daily stats", JSON.stringify(teamDailyStatses, null, 4));
		global.LOGGER.debug(requestId, TOPIC_OF_TEAM_STATS_COMMAND, "team stats", JSON.stringify(teamStatses, null, 4));
		global.LOGGER.info(requestId, TOPIC_OF_TEAM_STATS_COMMAND, dateString, teamDailyStatses.length, "team daily stats updated");
		global.LOGGER.info(requestId, TOPIC_OF_TEAM_STATS_COMMAND, dateString, teamStatses.length, "team stats updated");

		emitter.emit(TOPIC_OF_TEAM_STATS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_TEAM_STATS_COMMAND_SUCCESS,
			payload: { date },
		});
	} catch (error) {
		global.LOGGER.warn(requestId, TOPIC_OF_TEAM_STATS_COMMAND, error.formatStack());

		emitter.emit(TOPIC_OF_TEAM_STATS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_TEAM_STATS_COMMAND_FAILED,
			payload: { date },
		});
	}
}

module.exports = {
	subscribe,
};

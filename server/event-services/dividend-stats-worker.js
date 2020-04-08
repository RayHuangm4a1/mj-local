const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_DIVIDEND_STATS_COMMAND,
	TOPIC_OF_DIVIDEND_STATS_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_DIVIDEND_STATS_COMMAND_SUCCESS,
	REPLY_OF_DIVIDEND_STATS_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	doTeamDurationStatsByDate,
} = require("../services/dividend.system");
const getYesterday = require("../lib/date/get-yesterday");

function subscribe() {
	emitter.on(TOPIC_OF_DIVIDEND_STATS_COMMAND, handleDividendCommand);
}

async function handleDividendCommand({ requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_DIVIDEND_STATS_COMMAND);

	try {
		const yesterday = getYesterday();

		const { teamDailyStatses, teamDurationStatses } = await doTeamDurationStatsByDate(yesterday);

		global.LOGGER.debug(requestId, TOPIC_OF_DIVIDEND_STATS_COMMAND, `team daily statses ${JSON.stringify(teamDailyStatses, null, 4)}`);
		global.LOGGER.debug(requestId, TOPIC_OF_DIVIDEND_STATS_COMMAND, `team duration statses ${JSON.stringify(teamDurationStatses, null, 4)}`);
		global.LOGGER.info(requestId, TOPIC_OF_DIVIDEND_STATS_COMMAND, `${teamDailyStatses.length} team daily statses already statistics.`);
		global.LOGGER.info(requestId, TOPIC_OF_DIVIDEND_STATS_COMMAND, `${teamDurationStatses.length} team duration statses updated.`);

		emitter.emit(TOPIC_OF_DIVIDEND_STATS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_DIVIDEND_STATS_COMMAND_SUCCESS,
		});
	} catch (error) {
		global.LOGGER.warn(requestId, TOPIC_OF_DIVIDEND_STATS_COMMAND, error.formatStack());

		emitter.emit(TOPIC_OF_DIVIDEND_STATS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_DIVIDEND_STATS_COMMAND_FAILED,
		});
	}
}

module.exports = {
	subscribe,
};

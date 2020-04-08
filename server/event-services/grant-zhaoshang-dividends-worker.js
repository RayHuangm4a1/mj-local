const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_DIVIDEND_STATS_REPLY_EVENT,
	TOPIC_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND,
} = require("../lib/event-topics");
const {
	REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_SUCCESS,
	REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_SKIP,
	REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	grantSeriesZhaoShangDividendsByDurationId,
} = require("../services/dividend.system");
const {
	PLATFORM_PROJECTIONS,
	DIVIDEND_DURATION_PROJECTIONS,

	getPlatform,
	getDividendableDuration,
} = require("../services/platform.system");
const {
	isZhaoShangDividendsGrantDay,
} = require("../lib/stats-helpers");

function subscribe() {
	emitter.on(TOPIC_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND, handleGrantZhaoShangDividendsCommand);
}

async function handleGrantZhaoShangDividendsCommand({ requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND);

	try {
		const platform = await getPlatform({ projections: PLATFORM_PROJECTIONS.DIVIDEND_DURATION });

		if (!isZhaoShangDividendsGrantDay(platform.dividendDuration)) {
			throw new RangeError(`dividendDuration: ${platform.dividendDuration}, current is not allowed to grant zhaoshang dividends, skip`);
		}

		const dividendDuration = await getDividendableDuration({
			duration: platform.dividendDuration,
			projections: DIVIDEND_DURATION_PROJECTIONS.ID,
		});

		if (dividendDuration === null) {
			throw new RangeError(`previous dividend duration not found, skip`);
		}

		const { teamDurationStatses, wallets } = await grantSeriesZhaoShangDividendsByDurationId(dividendDuration.id);

		global.LOGGER.debug(requestId, TOPIC_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND, `teamDurationStatses ${JSON.stringify(teamDurationStatses, null, 4)}`);
		global.LOGGER.debug(requestId, TOPIC_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND, `wallets ${JSON.stringify(wallets, null, 4)}`);
		global.LOGGER.info(requestId, TOPIC_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND, `${teamDurationStatses.length} teamDurationStatses already updated.`);
		global.LOGGER.info(requestId, TOPIC_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND, `${wallets.length} zhaoshang dividends already granted.`);

		emitter.emit(TOPIC_OF_DIVIDEND_STATS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_SUCCESS,
		});
	} catch (error) {
		if (error instanceof RangeError) {
			emitter.emit(TOPIC_OF_DIVIDEND_STATS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_SKIP,
			});
		} else {
			global.LOGGER.warn(requestId, TOPIC_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND, error.formatStack());

			emitter.emit(TOPIC_OF_DIVIDEND_STATS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_GRANT_ZHAOSHANG_DIVIDENDS_COMMAND_FAILED,
			});
		}
	}
}

module.exports = {
	subscribe,
};

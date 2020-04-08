const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_OPEN_BETTINGS_COMMAND,
	TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_OPEN_BETTINGS_COMMAND_SKIP,
	REPLY_OF_OPEN_BETTINGS_COMMAND_SUCCESS,
	REPLY_OF_OPEN_BETTINGS_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	getEarliestRewardGrantingDrawing,
	setDrawingFromRewardGrantingToRewardGrantedByLotteryIdAndIssue,
} = require("../services/lottery.system");
const {
	getPlatform,
} = require("../services/platform.system");
const {
	BETTING_PROJECTIONS,

	getNewBettingsByLotteryIdIssueAndDates,
	grantSeriesBettingRewards,
	bulkUpdateFailedBettings,
} = require("../services/betting.system");
const RewardHelper = require("core-lib/reward-helper");
const { getDateBeforeNDays } = require("../lib/date");

function subscribe() {
	emitter.on(TOPIC_OF_OPEN_BETTINGS_COMMAND, handleOpenBettingsCommand);
}

async function handleOpenBettingsCommand({ requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_OPEN_BETTINGS_COMMAND);

	let drawing = null;
	let bettings = [];

	try {
		drawing = await getEarliestRewardGrantingDrawing();

		if (drawing === null) {
			throw new RangeError("without new drawing, skip.");
		}

		bettings = await getNewBettingsByLotteryIdIssueAndDates(
			drawing.lotteryId,
			drawing.issue,
			getDateBeforeNDays(7),
			drawing.openedAt,
			{
				projections: BETTING_PROJECTIONS.AWARD_GRANTING,
			}
		);

		if (!bettings.length) {
			global.LOGGER.verbose(requestId, TOPIC_OF_OPEN_BETTINGS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, bettings.length, "bettings");

			await setDrawingFromRewardGrantingToRewardGrantedByLotteryIdAndIssue(drawing.lotteryId, drawing.issue);

			emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_OPEN_BETTINGS_COMMAND_SUCCESS,
				payload: { drawing },
			});

			return;
		}
	} catch (error) {
		if (error instanceof RangeError) {
			emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_OPEN_BETTINGS_COMMAND_SKIP,
				payload: { drawing: { lotteryId: null } },
			});
		} else {
			global.LOGGER.error(requestId, TOPIC_OF_OPEN_BETTINGS_COMMAND, error.formatStack());

			emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_OPEN_BETTINGS_COMMAND_FAILED,
				payload: { drawing: { lotteryId: null } },
			});
		}

		return;
	}

	global.LOGGER.info(requestId, TOPIC_OF_OPEN_BETTINGS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, bettings.length, "bettings");

	try {
		const platform = await getPlatform();
		const helper = new RewardHelper(platform, drawing);

		helper.addBettings(bettings);

		const results = helper.getResults();
		const failedBettings = helper.getFailedBettings();

		if (results.length) {
			const {
				bettings: updatedBettings,
				transactionLogs: createdTransactionLogs,
			} = await grantSeriesBettingRewards({ platform, results, drawing, date: drawing.createdAt });

			global.LOGGER.debug(requestId, TOPIC_OF_OPEN_BETTINGS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, `user group bettings ${JSON.stringify(results, null, 4)}`);
			global.LOGGER.debug(requestId, TOPIC_OF_OPEN_BETTINGS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, `opened bettings ${JSON.stringify(updatedBettings, null, 4)}`);
			global.LOGGER.info(requestId, TOPIC_OF_OPEN_BETTINGS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, `${updatedBettings.length} bettings granted`);
			global.LOGGER.info(requestId, TOPIC_OF_OPEN_BETTINGS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, `${createdTransactionLogs.length} transaction logs created`);
		}

		if (failedBettings.length) {
			const updatedFailedBettings = await bulkUpdateFailedBettings(failedBettings);

			global.LOGGER.warn(requestId, TOPIC_OF_OPEN_BETTINGS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, `${updatedFailedBettings.length} bettings failed, one of failed ${JSON.stringify(updatedFailedBettings[0])}`);
		}

		await setDrawingFromRewardGrantingToRewardGrantedByLotteryIdAndIssue(drawing.lotteryId, drawing.issue);

		emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_OPEN_BETTINGS_COMMAND_SUCCESS,
			payload: { drawing },
		});
	} catch (error) {
		global.LOGGER.error(requestId, TOPIC_OF_OPEN_BETTINGS_COMMAND, error.formatStack());

		emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_OPEN_BETTINGS_COMMAND_FAILED,
			payload: { drawing },
		});
	}
}

module.exports = {
	subscribe,
};

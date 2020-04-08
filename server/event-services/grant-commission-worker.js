const emitter = require("../lib/event-emitter");
const {
	TOPIC_OF_GRANT_COMMISSIONS_COMMAND,
	TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT,
} = require("../lib/event-topics");
const {
	REPLY_OF_GRANT_COMMISSIONS_COMMAND_SUCCESS,
	REPLY_OF_GRANT_COMMISSIONS_COMMAND_SKIP,
	REPLY_OF_GRANT_COMMISSIONS_COMMAND_FAILED,
} = require("../lib/event-reply-types");
const {
	getEarliestRewardGrantedDrawing,
	setDrawingFromRewardGrantedToTeamCommissionGrantedByLotteryIdAndIssue,
} = require("../services/lottery.system");
const {
	TRANSACTION_LOG_PROJECTIONS,

	getPendingTransactionLogsByLotteryIdAndIssue,
} = require("../services/transaction-log.system");
const {
	grantSeriesTeamCommissions,
} = require("../services/betting.system");
const { UserGroupingTeamCommissionHelper } = require("../lib/transaction-log");

function subscribe() {
	emitter.on(TOPIC_OF_GRANT_COMMISSIONS_COMMAND, handleGrantCommissionsCommand);
}

async function handleGrantCommissionsCommand({ requestId }) {
	global.LOGGER.debug(requestId, TOPIC_OF_GRANT_COMMISSIONS_COMMAND);

	let drawing = null;
	let transactionLogs = [];

	try {
		drawing = await getEarliestRewardGrantedDrawing();

		if (drawing === null) {
			throw new RangeError(`no new reward granted drawing, skip.`);
		}

		transactionLogs = await getPendingTransactionLogsByLotteryIdAndIssue(drawing.lotteryId, drawing.issue, {
			projections: TRANSACTION_LOG_PROJECTIONS.COMMISSION_GRANTING,
		});

		if (!transactionLogs.length) {
			global.LOGGER.verbose(requestId, TOPIC_OF_GRANT_COMMISSIONS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, transactionLogs.length, "granting transaction logs");

			await setDrawingFromRewardGrantedToTeamCommissionGrantedByLotteryIdAndIssue(drawing.lotteryId, drawing.issue);

			emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_GRANT_COMMISSIONS_COMMAND_SUCCESS,
				payload: { drawing },
			});

			return;
		}
	} catch (error) {
		if (error instanceof RangeError) {
			emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_GRANT_COMMISSIONS_COMMAND_SKIP,
				payload: { drawing: { lotteryId: null } },
			});
		} else {
			global.LOGGER.error(requestId, TOPIC_OF_GRANT_COMMISSIONS_COMMAND, error.formatStack());

			emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
				requestId,
				type: REPLY_OF_GRANT_COMMISSIONS_COMMAND_FAILED,
				payload: { drawing: { lotteryId: null } },
			});
		}

		return;
	}

	global.LOGGER.info(requestId, TOPIC_OF_GRANT_COMMISSIONS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, transactionLogs.length, "granting transaction logs");

	try {
		const results = new UserGroupingTeamCommissionHelper()
			.addPendingTransactionLogs(transactionLogs)
			.getResults();

		if (results.length) {
			const { updatedTransactionLogs } = await grantSeriesTeamCommissions({ results, date: drawing.createdAt });

			global.LOGGER.debug(requestId, TOPIC_OF_GRANT_COMMISSIONS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, `user group transaction logs ${JSON.stringify(results, null, 4)}`);
			global.LOGGER.debug(requestId, TOPIC_OF_GRANT_COMMISSIONS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, `grant team commissions ${JSON.stringify(updatedTransactionLogs, null, 4)}`);
			global.LOGGER.info(requestId, TOPIC_OF_GRANT_COMMISSIONS_COMMAND, drawing.lotteryId, drawing.issue, drawing.opencode, `${updatedTransactionLogs.length} pending transaction logs updated`);
		}

		await setDrawingFromRewardGrantedToTeamCommissionGrantedByLotteryIdAndIssue(drawing.lotteryId, drawing.issue);

		emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_GRANT_COMMISSIONS_COMMAND_SUCCESS,
			payload: { drawing },
		});
	} catch (error) {
		global.LOGGER.error(requestId, TOPIC_OF_GRANT_COMMISSIONS_COMMAND, error.formatStack());

		emitter.emit(TOPIC_OF_OPEN_BETTINGS_REPLY_EVENT, {
			requestId,
			type: REPLY_OF_GRANT_COMMISSIONS_COMMAND_FAILED,
			payload: { drawing },
		});
	}
}

module.exports = {
	subscribe,
};

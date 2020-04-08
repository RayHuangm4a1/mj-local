const UserStore = require("../stores/user");
const BettingStore = require("../stores/betting");
const TraceStore = require("../stores/trace");
const WalletStore = require("../stores/wallet");
const TransactionLogStore = require("../stores/transaction-log");
const DrawingStore = require("../stores/drawing");
const UserStatsStore = require("../stores/user-stats");
const UserDailyStatsStore = require("../stores/user-daily-stats");
const TeamDailyStatsStore = require("../stores/team-daily-stats");
const {
	NotFoundError,
} = require("ljit-error");
const {
	sumBy,
	groupBy,
} = require("ljit-collection");
const FixedWageHelper = require("core-lib/fixed-wage-helper");
const TeamCommissionHelper = require("core-lib/team-commission-helper");
const {
	ENUM_BETTING_STATUS,
	ENUM_BETTING_CANCELED_TYPE,
	ENUM_TRANSACTION_TYPE,
} = require("../lib/enum");
const {
	WALLET_NOT_FOUND,
} = require("../lib/error/code");
const {
	generateTeamRebateGrantingTransactionLogs,
	generateTeamFixedWageGrantingTransactionLogs,
	generateBettingRewardGrantedTransactionLogs,
	addBalanceToTeamCommissionGrantingTransactionLogs,
	generateTerminatedBettingReturningTransactionLogs,
	generateNewBettingRevertTransactionLog,
	generateRevertTransactionLog,
} = require("../lib/transaction-log");
const {
	convertOpenedBettingsToUserDailyStats,
	spreadUserDailyStatsToTeamDailyStatses,
	convertTeamCommissionGrantingTransactionLogsToUserDailyStats,
	convertTransactionLogToRevertUserDailyStats,
} = require("../lib/stats-helpers");

/**
 * @param {object} platform - platform.
 * @param {array} results - The aggregated result of opened bettings.
 * @param {integer} results.userId - The user id .
 * @param {integer} results.walletCode - The wallet code.
 * @param {array} results.bettings - The opened bettings.
 * @param {integer} results.bettings.[*].id - The betting id.
 * @param {integer} results.bettings.[*].userId - The user id.
 * @param {string} results.bettings.[*].username - The username.
 * @param {float} results.bettings.[*].rebate - The user selected rebate.
 * @param {string} results.bettings.[*].opencode - The drawing opencode.
 * @param {float} results.bettings.[*].amount - The betting amount.
 * @param {integer} results.bettings.[*].bonus - The user bonus.
 * @param {float} results.bettings.[*].reward - The betting reward.
 * @param {float} results.bettings.[*].bettingRebateAmount - The betting rebate.
 * @param {object} results.bettings.[*].details - The won award detals.
 * @param {integer} results.bettings.[*].status - The betting status.
 * @param {date} results.bettings.[*].createdAt - The betting createdAt.
 * @param {date} date - The drawing createdAt.
 */
function grantSeriesBettingRewards({ platform, results, drawing, date }) {
	const mapper = async function (result) {
		const { userId, walletCode, bettings } = result;

		const user = await UserStore.getUserWithAncestorsById(userId, {
			userProjections: UserStore.DELTA_BONUS_AND_FIXED_WAGE_PROJECTIONS,
			ancestorProjections: UserStore.DELTA_BONUS_AND_FIXED_WAGE_PROJECTIONS,
		});

		const { ancestors, fixedWage } = user;

		const preparedBettings = new FixedWageHelper(fixedWage).fill(bettings);
		const simplifiedAncestors = user.ancestors.map(({ id, username }) => ({ id, username }));

		preparedBettings.forEach(betting => betting.ancestors = simplifiedAncestors);

		const preparedUserDailyStats = convertOpenedBettingsToUserDailyStats(preparedBettings, date);
		const preparedTeamDailyStatses = spreadUserDailyStatsToTeamDailyStatses(preparedUserDailyStats, ancestors);
		const {
			preparedTeamRebateTransactionLogs,
			preparedTeamFixedWageTransactionLogs,
		} = generateTeamCommissionGrantingTransactionLogs({ user, ancestors, walletCode, platform, drawing, preparedBettings });

		return grantBettingRewardsByUserIdWalletCodeAndDate(
			userId,
			walletCode,
			date,
			{
				drawing,
				preparedBettings,
				preparedUserDailyStats,
				preparedTeamDailyStatses,
				preparedTeamRebateTransactionLogs,
				preparedTeamFixedWageTransactionLogs,
			}
		);
	};

	return Promise
		.map(results, mapper, { concurrency: 1 })
		.reduce((accumulator, result) => {
			const { bettings, transactionLogs } = result;

			accumulator.bettings.push(...bettings);
			accumulator.transactionLogs.push(...transactionLogs);

			return accumulator;
		}, {
			bettings: [],
			transactionLogs: [],
		});
}

function generateTeamCommissionGrantingTransactionLogs({ user, ancestors, walletCode, platform, drawing, preparedBettings }) {
	const preparedTeamRebateTransactionLogs = [];
	const preparedTeamFixedWageTransactionLogs = [];

	const teamCommissionhelper = new TeamCommissionHelper(platform)
		.setLeaf(user)
		.setAncestors(ancestors)
		.addLeafBettings(preparedBettings);

	ancestors.forEach((ancestor) => {
		const [teamRebates, teamFixedWages] = teamCommissionhelper.getResultsByAncestorId(ancestor.id);
		const generatedTeamRebateTransactionLogs = generateTeamRebateGrantingTransactionLogs({ code: walletCode }, teamRebates, drawing);
		const generatedTeamFixedWageTransactionLogs = generateTeamFixedWageGrantingTransactionLogs({ code: walletCode }, teamFixedWages,  drawing);

		preparedTeamRebateTransactionLogs.push(...generatedTeamRebateTransactionLogs);
		preparedTeamFixedWageTransactionLogs.push(...generatedTeamFixedWageTransactionLogs);
	});

	return {
		preparedTeamRebateTransactionLogs,
		preparedTeamFixedWageTransactionLogs,
	};
}

/**
 * @param {integer} drawingId - The id of drawing.
 * @param {integer} userId - The id of user.
 * @param {integer} walletCode - The code of wallet.
 * @param {date} date - Current date.
 * @param {array} preparedBettings - The opened bettings.
 * @param {integer} preparedBettings.[*].id - The betting id.
 * @param {integer} preparedBettings.[*].userId - The user id.
 * @param {string} preparedBettings.[*].username - The username.
 * @param {float} preparedBettings.[*].rebate - The user selected rebate.
 * @param {string} preparedBettings.[*].opencode - The drawing opencode.
 * @param {float} preparedBettings.[*].amount - The betting amount.
 * @param {integer} preparedBettings.[*].bonus - The user bonus.
 * @param {float} preparedBettings.[*].reward - The betting reward.
 * @param {float} preparedBettings.[*].bettingRebateAmount - The betting rebate.
 * @param {object} preparedBettings.[*].details - The won award detals.
 * @param {integer} preparedBettings.[*].status - The betting status.
 * @param {object} preparedUserDailyStats - The sum of opened bettings.
 * @param {string} preparedUserDailyStats.username - The username.
 * @param {float} preparedUserDailyStats.bettingAmount - The total betting amount.
 * @param {float} preparedUserDailyStats.bettingReward - The total betting reward.
 * @param {float} preparedUserDailyStats.rebateAmount - The total betting rebate.
 * @param {float} preparedUserDailyStats.fixedWageAmount - The total betting fixedWage.
 * @param {object} preparedTeamDailyStatses - The ancestors' team daily stats.
 * @param {string} preparedTeamDailyStatses.[*].username - The username.
 * @param {float} preparedTeamDailyStatses.[*].bettingAmount - The total betting amount.
 * @param {float} preparedTeamDailyStatses.[*].bettingReward - The total betting reward.
 * @param {float} preparedTeamDailyStatses.[*].rebateAmount - The total betting rebate.
 * @param {float} preparedTeamDailyStatses.[*].fixedWageAmount - The total betting fixedWage.
 * @param {array} preparedTeamRebateTransactionLogs - The team rebate pending transaction logs.
 * @param {integer} preparedTeamRebateTransactionLogs.[*].userId - The ancestor id.
 * @param {string} preparedTeamRebateTransactionLogs.[*].username - The ancestor username.
 * @param {integer} preparedTeamRebateTransactionLogs.[*].associateId - The descendant's betting id.
 * @param {integer} preparedTeamRebateTransactionLogs.[*].type - team rebate.
 * @param {integer} preparedTeamRebateTransactionLogs.[*].walletCode - The descendant's betting used wallet code.
 * @param {float} preparedTeamRebateTransactionLogs.[*].amount - The team rebate amount.
 * @param {float} preparedTeamRebateTransactionLogs.[*].balance - null.
 * @param {string} preparedTeamRebateTransactionLogs.[*].description - The description of transaction.
 * @param {integer} preparedTeamRebateTransactionLogs.[*].status - pending.
 */
async function grantBettingRewardsByUserIdWalletCodeAndDate(userId, walletCode, date, {
	drawing,
	preparedBettings,
	preparedUserDailyStats,
	preparedTeamDailyStatses,
	preparedTeamRebateTransactionLogs,
	preparedTeamFixedWageTransactionLogs,
}) {
	const txn = BettingStore.getTransaction();

	try {
		const income = sumBy(preparedBettings, "reward", "bettingRebateAmount", "fixedWageAmount");
		const bettingAmount = sumBy(preparedBettings, "amount");
		const bettingReward = sumBy(preparedBettings, "reward");
		const {
			shouldBeContinuedTraceIds,
			shouldBeTerminatedTraceIds,
		} = groupTraceIds(preparedBettings);

		const operations = async (transaction) => {
			if (shouldBeContinuedTraceIds.length) {
				await TraceStore.increaseNumOfFinishedIssuesWithinIds(shouldBeContinuedTraceIds, 1, { transaction });
			}

			if (shouldBeTerminatedTraceIds.length) {
				await TraceStore.stopTracesWithinIds(shouldBeTerminatedTraceIds, { transaction });
				await BettingStore.stopBettingsWithinTraceIds(shouldBeTerminatedTraceIds, { transaction });
			}

			const wallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(userId, walletCode, income, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (wallet === null) {
				throw new NotFoundError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}

			const preparedBettingRewardGrantedTransactionLogs = generateBettingRewardGrantedTransactionLogs(wallet, preparedBettings);

			const transactionLogs = await TransactionLogStore.createTransactionLogs([
				...preparedBettingRewardGrantedTransactionLogs,
				...preparedTeamRebateTransactionLogs,
				...preparedTeamFixedWageTransactionLogs,
			], { transaction });

			preparedBettings = associateTransactionLogIdsToBettings(preparedBettings, transactionLogs);

			const bettings = await BettingStore.bulkUpdateBettingRewards(preparedBettings, { transaction });

			await DrawingStore.increaseIncomeAndExpenseByLotteryIdAndIssue(drawing.lotteryId, drawing.issue, {
				income: bettingAmount,
				expense: bettingReward,
			}, { transaction });
			await UserStatsStore.increaseBettingRelatedStatsByUserIdAndWalletCode(userId, walletCode, { bettingAmount, bettingReward }, { transaction });
			await UserDailyStatsStore.increaseUserDailyStatsByUserIdWalletCodeAndDate(userId, walletCode, date, preparedUserDailyStats, { transaction });
			await TeamDailyStatsStore.bulkIncreaseBettingRelatedTeamDailyStatses(preparedTeamDailyStatses, { transaction });

			return {
				bettings,
				transactionLogs,
			};
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		global.LOGGER.error(error.formatStack());

		throw error;
	}
}

function groupTraceIds(preparedBettings) {
	return preparedBettings
		.filter(({ traceId }) => traceId !== -1)
		.reduce((accumulator, preparedBetting) => {
			const { traceId, status, isTerminatedIfWin } = preparedBetting;

			if (status === "win" && isTerminatedIfWin) {
				accumulator.shouldBeTerminatedTraceIds.push(traceId);
			} else {
				accumulator.shouldBeContinuedTraceIds.push(traceId);
			}

			return accumulator;
		}, {
			shouldBeContinuedTraceIds: [],
			shouldBeTerminatedTraceIds: [],
		});
}

function associateTransactionLogIdsToBettings(preparedBettings, transactionLogs) {
	const transactionLogsMap = groupBy(transactionLogs, "associateId");

	return preparedBettings.map(preparedBetting => {
		const associatedTransactionLogs = transactionLogsMap[preparedBetting.id];

		preparedBetting.transactionLogIds = associatedTransactionLogs.map(({ id }) => id);

		return preparedBetting;
	});
}

function sliceAncestorsByUserId(userId, ancestors) {
	const index = ancestors.findIndex(({ id }) => id === userId);

	return ancestors.slice(index + 1);
}

function grantSeriesTeamCommissions({ results, date }) {
	const mapper = function (result) {
		const {
			userId, walletCode, transactionLogs,
		} = result;

		const ancestors = sliceAncestorsByUserId(userId, transactionLogs[0].betting.ancestors);

		const preparedUserDailyStats = convertTeamCommissionGrantingTransactionLogsToUserDailyStats(transactionLogs, date);
		const preparedTeamDailyStatses = spreadUserDailyStatsToTeamDailyStatses(preparedUserDailyStats, ancestors);

		return grantTeamCommissionsByUserIdWalletCodeAndDate(
			userId,
			walletCode,
			date,
			{
				transactionLogs,
				preparedUserDailyStats,
				preparedTeamDailyStatses,
			}
		);
	};

	return Promise
		.map(results, mapper, { concurrency: 1 })
		.reduce((accumulator, result) => {
			const { updatedTransactionLogs } = result;

			accumulator.updatedTransactionLogs.push(...updatedTransactionLogs);

			return accumulator;
		}, {
			updatedTransactionLogs: [],
		});
}

/**
 * @param {integer} userId - The id of user.
 * @param {integer} walletCode - The code of wallet.
 * @param {date} date - Current date.
 * @param {array} transactionLogs - The pending transaction logs.
 * @param {array} transactionLogs.[*].id - The pending transaction log id.
 * @param {array} transactionLogs.[*].amount - The pending transaction log amount.
 * @param {object} preparedUserDailyStats - The aggregated user daily stats.
 * @param {string} preparedUserDailyStats.username - The username.
 * @param {float} preparedUserDailyStats.rebateAmount - The total betting rebate.
 * @param {float} preparedUserDailyStats.fixedWageAmount - The total betting fixedWage.
 * @param {object} preparedTeamDailyStatses - The aggregated team daily statses.
 * @param {string} preparedTeamDailyStatses.[*].userId - The username.
 * @param {string} preparedTeamDailyStatses.[*].username - The username.
 * @param {integer} preparedTeamDailyStatses.[*].walletCode - The wallet code.
 * @param {float} preparedTeamDailyStatses.[*].rebateAmount - The total betting rebate.
 * @param {float} preparedTeamDailyStatses.[*].fixedWageAmount - The total betting fixedWage.
 */
async function grantTeamCommissionsByUserIdWalletCodeAndDate(userId, walletCode, date, {
	transactionLogs,
	preparedUserDailyStats,
	preparedTeamDailyStatses,
}) {
	const txn = BettingStore.getTransaction();

	try {
		const income = sumBy(transactionLogs, "amount");

		const operations = async (transaction) => {
			const wallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(userId, walletCode, income, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (wallet === null) {
				throw new NotFoundError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}

			const preparedTransactionLogs = addBalanceToTeamCommissionGrantingTransactionLogs(wallet, transactionLogs);
			const updatedTransactionLogs = await TransactionLogStore.bulkUpdateTransactionLogs(preparedTransactionLogs, { transaction });

			await UserDailyStatsStore.increaseUserDailyStatsByUserIdWalletCodeAndDate(userId, walletCode, date, preparedUserDailyStats, { transaction });
			await TeamDailyStatsStore.bulkIncreaseTeamCommissionRelatedTeamDailyStatses(preparedTeamDailyStatses, { transaction });

			return {
				updatedTransactionLogs,
			};
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		global.LOGGER.error(error.formatStack());

		throw error;
	}
}

async function terminateTraceByIdUserIdAndWalletCode(id, userId, walletCode) {
	const txn = TraceStore.getTransaction();

	try {
		const bettings = await BettingStore.getTerminatingBettingsByTraceId(id, {
			projections: BettingStore.TERMINATED_BETTINGS_RETURNING_REQUIRED_PROJECTIONS,
		});

		const returning = sumBy(bettings, "amount");

		const operations = async (transaction) => {
			await TraceStore.terminateTraceById(id, { transaction });
			await BettingStore.terminateBettingsByTraceId(id, { transaction });

			const wallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(userId, walletCode, returning, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (wallet === null) {
				throw new NotFoundError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}

			const preparedTransactionLogs = generateTerminatedBettingReturningTransactionLogs(wallet, bettings);

			const transactionLogs = await TransactionLogStore.createTransactionLogs(preparedTransactionLogs, { transaction });

			return {
				wallet,
				transactionLogs,
			};
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function cancelSeriesBettings({ drawing }) {
	const { lotteryId, issue } = drawing;
	const bettings = [];

	do {
		try {
			const betting = await BettingStore.getEarliestCancelableBettingByLotteryIdAndIssue(lotteryId, issue);

			if (betting === null) {
				break;
			}

			if (betting.status === ENUM_BETTING_STATUS.NEW) {
				await revertNewBetting(betting);
			} else {
				await revertRewardGrantedBetting(betting);
			}

			bettings.push(betting);
		} catch (error) {
			global.LOGGER.error(error.formatStack());
		}
	} while (true);

	return { bettings };
}

async function revertNewBetting(betting) {
	const txn = BettingStore.getTransaction();

	try {
		const {
			userId, walletCode, amount,
		} = betting;

		const operations = async (transaction) => {
			const wallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(userId, walletCode, amount, { transaction });

			if (wallet === null) {
				throw new NotFoundError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}

			const preparedTransactionLog = generateNewBettingRevertTransactionLog(wallet, betting);

			await TransactionLogStore.createTransactionLogs([preparedTransactionLog], { transaction });
			await BettingStore.cancelBettingById(betting.id, ENUM_BETTING_CANCELED_TYPE.CANCELED_BY_STAFF, { transaction });
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function revertRewardGrantedBetting(betting) {
	const txn = BettingStore.getTransaction();

	try {
		let associatedTransactionLogs = [];

		if (betting.transactionLogIds.length) {
			associatedTransactionLogs = await TransactionLogStore.getFinishedTransactionLogsWithinIds(betting.transactionLogIds);
		}

		const operations = async (transaction) => {
			const wallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(betting.userId, betting.walletCode, betting.amount, { transaction });

			if (wallet === null) {
				throw new NotFoundError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}

			const preparedTransactionLog = generateNewBettingRevertTransactionLog(wallet, betting);
			const preparedUserDailyStats = {
				userId: betting.userId,
				username: betting.username,
				walletCode: betting.walletCode,
				date: betting.createdAt,
				bettingAmount: -betting.amount,
			};
			const preparedTeamDailyStatses = spreadUserDailyStatsToTeamDailyStatses(preparedUserDailyStats, betting.ancestors);

			await BettingStore.cancelBettingById(betting.id, ENUM_BETTING_CANCELED_TYPE.CANCELED_BY_STAFF, { transaction });
			await TransactionLogStore.createTransactionLogs([preparedTransactionLog], { transaction });
			await UserStatsStore.decreaseBettingAmountStatsByUserIdAndWalletCode(betting.userId, betting.walletCode, betting.amount, { transaction });
			await UserDailyStatsStore.increaseUserDailyStatsByUserIdWalletCodeAndDate(betting.userId, betting.walletCode, betting.createdAt, preparedUserDailyStats, { transaction });
			await TeamDailyStatsStore.bulkIncreaseBettingRelatedTeamDailyStatses(preparedTeamDailyStatses, { transaction });
			await DrawingStore.increaseIncomeByLotteryIdAndIssue(betting.lotteryId, betting.issue, -betting.amount, { transaction });

			for (let i = 0, { length } = associatedTransactionLogs; i < length; i++) {
				const associatedTransactionLog = associatedTransactionLogs[i];
				const {
					userId, walletCode, lotteryId,
					issue, type, amount, createdAt,
				} = associatedTransactionLog;

				const wallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(userId, walletCode, -amount, { transaction });

				if (wallet === null) {
					throw new NotFoundError(
						WALLET_NOT_FOUND.MESSAGE,
						WALLET_NOT_FOUND.CODE
					);
				}

				const preparedTransactionLog = generateRevertTransactionLog(wallet, associatedTransactionLog);
				const preparedUserDailyStats = convertTransactionLogToRevertUserDailyStats(associatedTransactionLog);
				const ancestors = sliceAncestorsByUserId(userId, betting.ancestors);
				const preparedTeamDailyStatses = spreadUserDailyStatsToTeamDailyStatses(preparedUserDailyStats, ancestors);

				await TransactionLogStore.createTransactionLogs([preparedTransactionLog], { transaction });
				await UserDailyStatsStore.increaseUserDailyStatsByUserIdWalletCodeAndDate(userId, walletCode, createdAt, preparedUserDailyStats, { transaction });
				await TeamDailyStatsStore.bulkIncreaseBettingRelatedTeamDailyStatses(preparedTeamDailyStatses, { transaction });

				if (type === ENUM_TRANSACTION_TYPE.BETTING_REWARD) {
					await DrawingStore.increaseExpenseByLotteryIdAndIssue(lotteryId, issue, -amount, { transaction });
				}
			}
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function renewSeriesBettings({ drawing }) {
	const { lotteryId, issue } = drawing;
	const bettings = [];

	do {
		try {
			const betting = await BettingStore.getEarliestRenewableBettingByLotteryIdAndIssue(lotteryId, issue);

			if (betting === null) {
				break;
			}

			await renewRewardGrantedBetting(betting);

			bettings.push(betting);
		} catch (error) {
			global.LOGGER.error(error.formatStack());
		}
	} while (true);

	return { bettings };
}

async function renewRewardGrantedBetting(betting) {
	const txn = BettingStore.getTransaction();

	try {
		let associatedTransactionLogs = [];

		if (betting.transactionLogIds) {
			associatedTransactionLogs = await TransactionLogStore.getFinishedTransactionLogsWithinIds(betting.transactionLogIds);
		}

		const operations = async (transaction) => {
			const preparedUserDailyStats = {
				userId: betting.userId,
				username: betting.username,
				walletCode: betting.walletCode,
				date: betting.createdAt,
				bettingAmount: -betting.amount,
			};
			const preparedTeamDailyStatses = spreadUserDailyStatsToTeamDailyStatses(preparedUserDailyStats, betting.ancestors);

			await BettingStore.renewBettingById(betting.id, { transaction });
			await UserStatsStore.decreaseBettingAmountStatsByUserIdAndWalletCode(betting.userId, betting.walletCode, betting.amount, { transaction });
			await UserDailyStatsStore.increaseUserDailyStatsByUserIdWalletCodeAndDate(betting.userId, betting.walletCode, betting.createdAt, preparedUserDailyStats, { transaction });
			await TeamDailyStatsStore.bulkIncreaseBettingRelatedTeamDailyStatses(preparedTeamDailyStatses, { transaction });
			await DrawingStore.increaseIncomeByLotteryIdAndIssue(betting.lotteryId, betting.issue, -betting.amount, { transaction });

			for (let i = 0, { length } = associatedTransactionLogs; i < length; i++) {
				const associatedTransactionLog = associatedTransactionLogs[i];
				const {
					userId, walletCode, lotteryId,
					issue, type, amount, createdAt,
				} = associatedTransactionLog;

				const wallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(userId, walletCode, -amount, { transaction });

				if (wallet === null) {
					throw new NotFoundError(
						WALLET_NOT_FOUND.MESSAGE,
						WALLET_NOT_FOUND.CODE
					);
				}

				const preparedTransactionLog = generateRevertTransactionLog(wallet, associatedTransactionLog);
				const preparedUserDailyStats = convertTransactionLogToRevertUserDailyStats(associatedTransactionLog);
				const ancestors = sliceAncestorsByUserId(userId, betting.ancestors);
				const preparedTeamDailyStatses = spreadUserDailyStatsToTeamDailyStatses(preparedUserDailyStats, ancestors);

				await TransactionLogStore.createTransactionLogs([preparedTransactionLog], { transaction });
				await UserDailyStatsStore.increaseUserDailyStatsByUserIdWalletCodeAndDate(userId, walletCode, createdAt, preparedUserDailyStats, { transaction });
				await TeamDailyStatsStore.bulkIncreaseBettingRelatedTeamDailyStatses(preparedTeamDailyStatses, { transaction });

				if (type === ENUM_TRANSACTION_TYPE.BETTING_REWARD) {
					await DrawingStore.increaseExpenseByLotteryIdAndIssue(lotteryId, issue, -amount, { transaction });
				}
			}
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

module.exports = {
	getNewBettingsByLotteryIdIssueAndDates: BettingStore.getNewBettingsByLotteryIdIssueAndDates,
	getBettingsByLotteryIdIssueAndDates: BettingStore.getBettingsByLotteryIdIssueAndDates,
	getTerminatingTraces: TraceStore.getTerminatingTraces,

	grantSeriesBettingRewards,
	grantSeriesTeamCommissions,
	terminateTraceByIdUserIdAndWalletCode,
	cancelSeriesBettings,
	renewSeriesBettings,

	bulkUpdateFailedBettings: BettingStore.bulkUpdateFailedBettings,

	BETTING_PROJECTIONS: {
		AWARD_GRANTING: BettingStore.AWARD_CACULATION_REQUIRED_PROJECTIONS,
	},
	TRACE_PROJECTIONS: {
		TERMINATE: TraceStore.TERMINATE_REQUIRED_PROJECTIONS,
	},
};

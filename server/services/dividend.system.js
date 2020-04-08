const UserDividendSettingStore = require("../stores/user-dividend-setting");
const UserStore = require("../stores/user");
const RelationshipStore = require("../stores/relationship");
const UserDailyStatsStore = require("../stores/user-daily-stats");
const TeamDailyStatsStore = require("../stores/team-daily-stats");
const TeamDurationStatsStore = require("../stores/team-duration-stats");
const WalletStore = require("../stores/wallet");
const TransactionLogStore = require("../stores/transaction-log");
const PlatformStore = require("../stores/platform");
const DividendDurationStore = require("../stores/dividend-duration");
const {
	NotFoundError,
} = require("ljit-error");
const {
	WALLET_NOT_FOUND,
	TEAM_DURATION_STATS_NOT_FOUND,
} = require("../lib/error/code");
const {
	ENUM_WALLET_CODE,
	ENUM_DIVIDEND_TYPE,
	ENUM_USER_TYPE,
} = require("../lib/enum");
const {
	generateDividendTransferOutTransactionLog,
	generateDividendTransferInTransactionLog,
	generateGrantedZhaoShangDividendsTransactionLog,
} = require("../lib/transaction-log");
const {
	DividendStatusAndMaxGrantAmountHelper,
	convertGrantedZhaoShangDividendsTransactionLogToUserDailyStats,
	spreadUserDailyStatsToTeamDailyStatses,
} = require("../lib/stats-helpers");
const { omit } = require("ljit-collection");

async function transferSeriesDividends() {
	const supervisionWallets = [];

	do {
		try {
			const supervisionWallet = await WalletStore.getDividendableSupervisionWallet();

			if (supervisionWallet === null) {
				break;
			}

			const { userId } = supervisionWallet;

			const user = await UserStore.getUserById(userId);

			if (!user.isDividendable()) {
				continue;
			}

			const wallet = await transferDividendsByUserIdAndWalletCode(userId, ENUM_WALLET_CODE.PRIMARY);

			supervisionWallets.push(wallet);
		} catch (error) {
			global.LOGGER.error(error.formatStack());
		}
	} while (true);

	return supervisionWallets;
}

async function transferDividendsByUserIdAndWalletCode(userId, walletCode) {
	const txn = WalletStore.getTransaction();

	try {
		const operations = async (transaction) => {
			const previousSupervisionWallet = await WalletStore.getWalletByUserIdAndWalletCode(userId, ENUM_WALLET_CODE.SUPERVISION, {
				lock: transaction.LOCK.UPDATE,
				transaction,
			});

			if (previousSupervisionWallet === null) {
				throw new NotFoundError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}

			const { balance } = previousSupervisionWallet;

			const afterSupervisionWallet = await WalletStore.decreaseWalletBalanceByUserIdAndWalletCode(userId, ENUM_WALLET_CODE.SUPERVISION, balance, { transaction });

			if (afterSupervisionWallet === null) {
				throw new NotFoundError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}

			const afterTransferInWallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(userId, walletCode, balance, { transaction });

			if (afterTransferInWallet === null) {
				throw new NotFoundError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}

			const preparedTransferOutTransactionLog = generateDividendTransferOutTransactionLog(previousSupervisionWallet);
			const preparedTransferInTransactionLog = generateDividendTransferInTransactionLog(previousSupervisionWallet, afterTransferInWallet);

			await TransactionLogStore.createTransactionLogs([
				preparedTransferOutTransactionLog,
				preparedTransferInTransactionLog,
			], { transaction });

			return {
				supervisionWallet: previousSupervisionWallet
			};
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function doTeamDurationStatsByDate(date) {
	const results = {
		teamDailyStatses: [],
		teamDurationStatses: [],
	};

	const platform = await PlatformStore.getPlatform({ projections: PlatformStore.DIVIDEND_STATS_REQUIRED_PROJECTIONS });
	const dividendDuration = await DividendDurationStore.getDividendDurationByDate(date, {
		duration: platform.dividendDuration,
		projections: DividendDurationStore.ID_ONLY_PROJECTIONS,
	});
	const cursor = TeamDailyStatsStore.paginateTeamDailyStatsByDate(date, { projections: TeamDailyStatsStore.INCREMENT_TEAM_DURATION_STATS_REQUIRED_PROJECTIONS });

	do {
		const teamDailyStats = await cursor.next();

		if (teamDailyStats === null) {
			break;
		}

		const { userId, walletCode, date: statsAt } = teamDailyStats;
		const preparedTeamDurationStats = omit(teamDailyStats, ["userId", "walletCode", "date"]);

		const teamDurationStats = await doTeamDurationStatsByUserIdWalletCodeDurationIdAndLatestStatsAt(userId, walletCode, dividendDuration.id,
			statsAt, preparedTeamDurationStats
		);
		const user = await UserStore.getUserById(teamDurationStats.userId, { projections: UserStore.TYPE_ONLY_PROJECTIONS });

		let dividendSettings = [];

		if (user.isAgentOrMember()) {
			dividendSettings = await UserDividendSettingStore.getUserDividendSettingsByUserIdAndType(teamDurationStats.userId, ENUM_DIVIDEND_TYPE.SELF);
		} else if (user.isZhaoShang()) {
			dividendSettings = platform.dividendSettings;
		} else {
			continue;
		}

		const updatedTeamDurationStats = await evaluateDividendArchievementByUserIdWalletCodeAndDurationId(teamDurationStats.userId, teamDurationStats.walletCode, teamDurationStats.durationId, dividendSettings);

		results.teamDailyStatses.push(teamDailyStats);
		results.teamDurationStatses.push(updatedTeamDurationStats);
	} while (cursor.hasNext());

	return results;
}

async function doTeamDurationStatsByUserIdWalletCodeDurationIdAndLatestStatsAt(
	userId, walletCode, durationId,
	latestStatsAt, preparedTeamDurationStats
) {
	const txn = TeamDurationStatsStore.getTransaction();

	try {
		const operations = async (transaction) => {
			const [teamDurationStats, isCreated] = await TeamDurationStatsStore.createTeamDurationStatsIfNotExist({
				userId, walletCode, durationId,
				latestStatsAt, ...preparedTeamDurationStats,
			}, {
				transaction,
			});

			if (!isCreated) {
				await TeamDurationStatsStore.incrementTeamDurationStatsByUserIdWalletCodeDurationIdAndLatestStatsAt(
					userId, walletCode, durationId,
					latestStatsAt, preparedTeamDurationStats, { transaction }
				);
			}

			return teamDurationStats;
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function evaluateDividendArchievementByUserIdWalletCodeAndDurationId(userId, walletCode, durationId, dividendSettings) {
	const txn = TeamDurationStatsStore.getTransaction();

	try {
		const operations = async (transaction) => {
			const teamDurationStats = await TeamDurationStatsStore.getTeamDurationStatsByUserIdWalletCodeAndDurationId(userId, walletCode, durationId, {
				projections: TeamDurationStatsStore.EVALUATE_DIVIDEND_ARCHIEVEMENT_REQUIRED_PROJECTIONS,
				lock: transaction.LOCK.UPDATE,
				transaction,
			});
			const { status, maxGrantAmount } = new DividendStatusAndMaxGrantAmountHelper({
				teamDurationStats, dividendSettings,
			}).getResult();

			await TeamDurationStatsStore.updateTeamDurationStatsMaxGrantAmountAndStatusByUserIdWalletCodeAndDurationId(userId, walletCode, durationId, { status, maxGrantAmount }, {
				transaction,
			});

			teamDurationStats.status = status;
			teamDurationStats.maxGrantAmount = maxGrantAmount;

			return teamDurationStats;
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function grantSeriesZhaoShangDividendsByDurationId(dividendDurationId) {
	const results = {
		teamDurationStatses: [],
		wallets: [],
	};

	const cursor = UserStore.paginateUsersByType(ENUM_USER_TYPE.ZHAOSHANG);

	do {
		try {
			const user = await cursor.next();

			if (user === null) {
				break;
			}

			const { teamDurationStats, wallet } = await grantZhaoShangDividendsByUserIdWalletCodeAndDurationId(user.id, ENUM_WALLET_CODE.PRIMARY, dividendDurationId);

			results.teamDurationStatses.push(teamDurationStats);
			results.wallets.push(wallet);
		} catch (error) {
			global.LOGGER.error(error.formatStack());
		}
	} while (true);

	return results;
}

async function grantZhaoShangDividendsByUserIdWalletCodeAndDurationId(userId, walletCode, durationId) {
	const txn = TeamDurationStatsStore.getTransaction();
	const currentDate = new Date();

	try {
		const ancestors = await RelationshipStore.getAncestorRelationshipsByUserId(userId, { projections: RelationshipStore.ANCESTOR_PROJECTIONS });

		const operations = async (transaction) => {
			const teamDurationStats = await TeamDurationStatsStore.getNotGrantedTeamDurationStatsByUserIdWalletCodeAndDurationId(userId, walletCode, durationId, {
				projections: TeamDurationStatsStore.GRANT_ZHAOSHANG_DIVIDENDS_REQUIRED_PROJECTIONS,
				transaction,
			});

			if (teamDurationStats === null) {
				throw new NotFoundError(
					TEAM_DURATION_STATS_NOT_FOUND.MESSAGE,
					TEAM_DURATION_STATS_NOT_FOUND.CODE
				);
			}

			const { maxGrantAmount } = teamDurationStats;

			const updatedSupervisionWallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(userId, ENUM_WALLET_CODE.SUPERVISION, maxGrantAmount, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (updatedSupervisionWallet === null) {
				throw new NotFoundError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}
			const updatedTeamDurationStats = await TeamDurationStatsStore.increaseTeamDurationStatsGrantedAmountByUserIdWalletCodeAndDurationId(userId, walletCode, durationId, maxGrantAmount, { transaction });

			const preparedGrantedDividendsTransactionLog = generateGrantedZhaoShangDividendsTransactionLog(updatedSupervisionWallet, maxGrantAmount);

			const [transactionLog] = await TransactionLogStore.createTransactionLogs([
				preparedGrantedDividendsTransactionLog,
			], { transaction });

			const preparedUserDailyStats = convertGrantedZhaoShangDividendsTransactionLogToUserDailyStats(transactionLog, walletCode);
			const preparedTeamDailyStatses = spreadUserDailyStatsToTeamDailyStatses(preparedUserDailyStats, ancestors);

			await UserDailyStatsStore.increaseUserDailyStatsByUserIdWalletCodeAndDate(userId, walletCode, currentDate, preparedUserDailyStats, { transaction });
			await TeamDailyStatsStore.bulkIncreaseZhaoShangDividendsGrantedTeamDailyStatses(preparedTeamDailyStatses, { transaction });

			return {
				teamDurationStats: updatedTeamDurationStats,
				wallet: updatedSupervisionWallet,
			};
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

module.exports = {
	doTeamDurationStatsByDate,
	transferSeriesDividends,
	grantSeriesZhaoShangDividendsByDurationId,
};

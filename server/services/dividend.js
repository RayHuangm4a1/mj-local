const UserDividendSettingStore = require("../stores/user-dividend-setting");
const UserDailyStatsStore = require("../stores/user-daily-stats");
const TeamDailyStatsStore = require("../stores/team-daily-stats");
const TeamDurationStatsStore = require("../stores/team-duration-stats");
const WalletStore = require("../stores/wallet");
const TransactionLogStore = require("../stores/transaction-log");
const {
	ForbiddenError,
	NotFoundError,
} = require("ljit-error");
const {
	DIVIDEND_INSUFFICIENT_BALANCE,
	WALLET_NOT_FOUND,
} = require("../lib/error/code");
const {
	ENUM_WALLET_CODE,
} = require("../lib/enum");
const {
	generateGrantedChildrenDividendsTransactionLog,
	generateReceivedDividendsTransactionLog,
} = require("../lib/transaction-log");
const {
	convertTransactionLogToUserDailyStats,
} = require("../lib/stats-helpers");
const { pick } = require("ljit-collection");

async function setSelfDividendSettingsByUserId(userId, dividendSettings) {
	const txn = UserDividendSettingStore.getTransaction();

	try {
		const operations = async function (transaction) {
			await UserDividendSettingStore.upsertSelfDividendSettingsByUserIdAndDividendSettings(userId, dividendSettings, {
				transaction,
			});

			const teamDurationStatses = await TeamDurationStatsStore.getTeamDurationStatsesByUserIdAndWalletCode(userId, ENUM_WALLET_CODE.PRIMARY, {
				transaction,
				lock: transaction.LOCK.UPDATE,
			});

			await TeamDurationStatsStore.bulkUpdateTeamDurationStatsMaxGrantAmountAndStatus(
				teamDurationStatses,
				dividendSettings,
				{
					transaction,
				}
			);

			return dividendSettings;
		};

		await txn.startTransaction(operations);

		return txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

async function grantDividendsByAncestorIdWalletCodeDurationIdAndChildrenId(ancestorId, ancestorWalletCode, durationId, childrenId,
	amount,
) {
	const txn = TeamDurationStatsStore.getTransaction();
	const currentDate = new Date();

	try {
		const operations = async (transaction) => {
			const updatedChildrenTeamDurationStats = await TeamDurationStatsStore.increaseTeamDurationStatsGrantedAmountByUserIdWalletCodeAndDurationId(childrenId, ENUM_WALLET_CODE.PRIMARY, durationId, amount, { transaction });

			const ancestorUpdatedWallet = await WalletStore.decreaseWalletBalanceByUserIdAndWalletCode(ancestorId, ancestorWalletCode, amount, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (ancestorUpdatedWallet === null) {
				throw new ForbiddenError(
					DIVIDEND_INSUFFICIENT_BALANCE.MESSAGE,
					DIVIDEND_INSUFFICIENT_BALANCE.CODE
				);
			}

			const childrenUpdatedWallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(childrenId, ENUM_WALLET_CODE.SUPERVISION, amount, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (childrenUpdatedWallet === null) {
				throw new NotFoundError(
					WALLET_NOT_FOUND.MESSAGE,
					WALLET_NOT_FOUND.CODE
				);
			}

			const preparedGrantedDividendsTransactionLog = generateGrantedChildrenDividendsTransactionLog(ancestorUpdatedWallet, childrenUpdatedWallet, amount);
			const preparedReceivedDividendsTransactionLog = generateReceivedDividendsTransactionLog(childrenUpdatedWallet, amount);

			await TransactionLogStore.createTransactionLogs([
				preparedGrantedDividendsTransactionLog,
				preparedReceivedDividendsTransactionLog,
			], { transaction });

			const preparedAncestorUserDailyStats = convertTransactionLogToUserDailyStats(preparedGrantedDividendsTransactionLog);
			const preparedChildrenUserDailyStats = convertTransactionLogToUserDailyStats(preparedReceivedDividendsTransactionLog);

			await UserDailyStatsStore.increaseUserDailyStatsByUserIdWalletCodeAndDate(ancestorId, ENUM_WALLET_CODE.PRIMARY, currentDate, preparedAncestorUserDailyStats, { transaction });
			await UserDailyStatsStore.increaseUserDailyStatsByUserIdWalletCodeAndDate(childrenId, ENUM_WALLET_CODE.PRIMARY, currentDate, preparedChildrenUserDailyStats, { transaction });
			await TeamDailyStatsStore.increaseTeamDailyStatsByUserIdWalletCodeAndDate(childrenId, ENUM_WALLET_CODE.PRIMARY, currentDate, preparedChildrenUserDailyStats, { transaction });

			return {
				ancestorWallet: ancestorUpdatedWallet,
				childrenWithTeamDurationStats: {
					id: childrenId,
					username: updatedChildrenTeamDurationStats.username,
					teamDurationStats: [
						pick(updatedChildrenTeamDurationStats, [
							"bettingReward", "rebateAmount", "activityAmount",
							"fixedWageAmount", "bettingAmount", "incentiveAmount",
							"status", "maxGrantAmount", "grantedAmount",
							"durationId", "profit",
						]),
					],
				},
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
	getUserDividendSettingsByUserIdAndType: UserDividendSettingStore.getUserDividendSettingsByUserIdAndType,

	upsertTemplateDividendSettingsByUserIdAndDividendSettings: UserDividendSettingStore.upsertTemplateDividendSettingsByUserIdAndDividendSettings,
	setSelfDividendSettingsByUserId,
	grantDividendsByAncestorIdWalletCodeDurationIdAndChildrenId,
};

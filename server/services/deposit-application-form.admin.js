const {
	NotFoundError,
} = require('ljit-error');
const {
	WALLET_NOT_FOUND,
	DEPOSIT_APPLICATION_FORM_NOT_FOUND,
} = require('../lib/error/code');
const { generateDepositTransactionLogs } = require('../lib/transaction-log');
const {
	getDecreasedFeeDepositAmount,
} = require('../lib/deposit');
const {
	convertDepositTransactionLogsToUserDailyStats,
	spreadUserDailyStatsToTeamDailyStatses,
} = require('../lib/stats-helpers');
const DepositApplicationFormStore = require('../stores/deposit-application-form');
const BankAccountStore = require('../stores/bank-account');
const DepositClassStore = require('../stores/deposit-class');
const DepositAmountStore = require('../stores/deposit-amount');
const WalletStore = require('../stores/wallet');
const TransactionStore = require('../stores/transaction-log');
const UserStatsStore = require('../stores/user-stats');
const UserDailyStatsStore = require('../stores/user-daily-stats');
const TeamDailyStatsStore = require('../stores/team-daily-stats');
const RelationshipStore = require('../stores/relationship');

async function mergeNewToInconsistentDepositApplicationForm(
	newDepositApplicationForm,
	mergeRequiredInconsistentDepositApplicationForm,
	{ operator } = {
}) {
	const txn = DepositApplicationFormStore.getTransaction();
	const currentDate = new Date();

	try {
		const operations = async (transaction) => {
			const confirmedDepositApplicationForm = await DepositApplicationFormStore.mergeNewToInconsistentDepositApplicationForm(newDepositApplicationForm, mergeRequiredInconsistentDepositApplicationForm, { operator, transaction });

			if (confirmedDepositApplicationForm === null) {
				throw new NotFoundError(DEPOSIT_APPLICATION_FORM_NOT_FOUND.MESSAGE, DEPOSIT_APPLICATION_FORM_NOT_FOUND.CODE);
			}

			// 刪除 newDepositApplicationForm 並釋放小數點充值金額
			const { userId, walletCode, depositAmountId } = newDepositApplicationForm;

			await DepositAmountStore.releaseDepositAmountById(depositAmountId, { transaction });
			await DepositApplicationFormStore.setDepositApplicationFormFromNewToMergedById(newDepositApplicationForm.id, { operator }, { transaction });

			// 計算實際入帳金額並產生帳變明細
			const { depositClass, bankAccount, amount } = mergeRequiredInconsistentDepositApplicationForm;
			const { percentageOfFee, percentageOfDama } = bankAccount;

			const decreasedFeeDepositAmount = getDecreasedFeeDepositAmount({ amount, percentageOfFee });

			const wallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(userId, walletCode, decreasedFeeDepositAmount, { transaction });

			if (wallet === null) {
				throw new NotFoundError(WALLET_NOT_FOUND.MESSAGE, WALLET_NOT_FOUND.CODE);
			}

			const preparedDepositTransactionLogs = generateDepositTransactionLogs(
				wallet, depositClass, confirmedDepositApplicationForm
			);

			const depositTransactionLogs = await TransactionStore.createTransactionLogs(preparedDepositTransactionLogs, { transaction });

			// 更新統計數據
			await UserStatsStore.increaseDepositAmountStatsByUserIdAndWalletCode(userId, walletCode,
				{ amount, percentageOfDama, percentageOfFee }, {
				transaction,
			});

			// TODO: 要以"原始充值金額"或"扣除平台手續費後的充值金額"做統計須等 PM 回覆，目前以後者作統計
			const preparedUserDailyStats = convertDepositTransactionLogsToUserDailyStats(depositTransactionLogs, currentDate);

			const ancestors = await RelationshipStore.getAncestorRelationshipsByUserId(userId, { transaction, projections: RelationshipStore.ANCESTOR_PROJECTIONS });

			const preparedTeamDailyStatses = spreadUserDailyStatsToTeamDailyStatses(preparedUserDailyStats, ancestors);

			await UserDailyStatsStore.increaseUserDailyStatsByUserIdWalletCodeAndDate(userId, walletCode, currentDate, preparedUserDailyStats, { transaction });
			await TeamDailyStatsStore.bulkIncreaseDepositRelatedTeamDailyStatses(preparedTeamDailyStatses, { transaction });

			return {
				depositApplicationForm: confirmedDepositApplicationForm,
				wallet,
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
	getNewDepositApplicationFormById: DepositApplicationFormStore.getNewDepositApplicationFormById,
	getMergeRequiredInconsistentDepositApplicationFormById: DepositApplicationFormStore.getMergeRequiredInconsistentDepositApplicationFormById,
	getNewDepositApplicationFormByIdDepartmentIdAndDepositClassId: DepositApplicationFormStore.getNewDepositApplicationFormByIdDepartmentIdAndDepositClassId,
	mergeNewToInconsistentDepositApplicationForm,

	BANK_ACCOUNT_PROJECTIONS: {
		PERCENTAGE_OF_DAMA_AND_FEE: BankAccountStore.PERCENTAGE_OF_DAMA_AND_FEE_PROJECTIONS,
	},
	DEPOSIT_CLASS_PROJECTIONS: {
		MIN: DepositClassStore.MIN_PROJECTIONS,
	},
};

const {
	ForbiddenError,
} = require("ljit-error");
const {
	WITHDRAWAL_INSUFFICIENT_BALANCE,
} = require("../lib/error/code");
const UserWithdrawalPolicyStore = require("../stores/user-withdrawal-policy");
const WithdrawalApplicationFormStore = require("../stores/withdrawal-application-form");
const WalletStore = require("../stores/wallet");
const TransactionLogStore = require("../stores/transaction-log");
const { generateWithdrawalTransactionLog } = require("../lib/transaction-log");

async function createWithdrawalApplicationForm(row) {
	const txn = WithdrawalApplicationFormStore.getTransaction();
	const { userId, walletCode, amount } = row;

	try {
		const operations = async (transaction) => {
			const wallet = await WalletStore.decreaseWalletBalanceByUserIdAndWalletCode(userId, walletCode, amount, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (wallet === null) {
				throw new ForbiddenError(
					WITHDRAWAL_INSUFFICIENT_BALANCE.MESSAGE,
					WITHDRAWAL_INSUFFICIENT_BALANCE.CODE
				);
			}

			const preparedTransactionLog = generateWithdrawalTransactionLog(wallet, amount);

			await TransactionLogStore.createTransactionLogs([preparedTransactionLog], { transaction });

			const withdrawalApplicationform = await WithdrawalApplicationFormStore.createWithdrawalApplicationForm(row, { transaction });

			return {
				wallet,
				withdrawalApplicationform,
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
	countPreviousWithdrawalApplicationFormsByUserId: WithdrawalApplicationFormStore.countPreviousWithdrawalApplicationFormsByUserId,
	countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId: WithdrawalApplicationFormStore.countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId,
	createWithdrawalApplicationForm,

	USER_WITHDRAWAL_POLICY_PROJECTIONS: {
		WITHDRAWAL_CREATION: UserWithdrawalPolicyStore.WITHDRAWAL_CREATION_REQUIRED_PROJECTIONS,
	},
};

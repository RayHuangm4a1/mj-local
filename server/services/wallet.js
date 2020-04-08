const WalletStore = require("../stores/wallet");
const TransactionLogStore = require("../stores/transaction-log");
const UserDailyStatsStore = require("../stores/user-daily-stats");
const { generateTransferTransactionLogs } = require("../lib/transaction-log");
const {
	getTodayUserDailyStatsByUserIdWalletCode,
	TRANSFER_AMOUNT_ONLY_PROJECTIONS,
} = require("../stores/user-daily-stats");
const {
	ForbiddenError,
} = require("ljit-error");
const {
	WALLET_INSUFFICIENT_BALANCE,
} = require("../lib/error/code");
const MAX_TRANSFER_AMOUNT_PER_DAY = 2000000;

async function isExceedMaxTransferAmountPerDayByUserIdWalletCodeAndAmount(userId, walletCode, amount) {
	const stats = await getTodayUserDailyStatsByUserIdWalletCode(userId, walletCode, {
		projections: TRANSFER_AMOUNT_ONLY_PROJECTIONS,
	});

	if (stats === null) {
		return false;
	}

	return stats.transferAmount + amount > MAX_TRANSFER_AMOUNT_PER_DAY;
}

async function transferByUserIdReceiverIdAndWalletCode(userId, receiverId, walletCode, { amount }) {
	const txn = WalletStore.getTransaction();

	try {
		const operations = async (transaction) => {
			const userWallet = await WalletStore.decreaseWalletBalanceByUserIdAndWalletCode(userId, walletCode, amount, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			if (userWallet === null) {
				throw new ForbiddenError(WALLET_INSUFFICIENT_BALANCE.MESSAGE, WALLET_INSUFFICIENT_BALANCE.CODE);
			}

			await UserDailyStatsStore.increaseUserDailyStatsByUserIdWalletCodeAndDate(userId, walletCode, new Date(), {
				username: userWallet.username,
				transferAmount: amount,
			}, {
				transaction,
			});

			const receiverWallet = await WalletStore.increaseWalletBalanceByUserIdAndWalletCode(receiverId, walletCode, amount, {
				transaction,
				projections: WalletStore.MIN_PROJECTIONS,
			});

			const preparedTransactionLogs = generateTransferTransactionLogs(userWallet, receiverWallet, amount);

			await TransactionLogStore.createTransactionLogs(preparedTransactionLogs, { transaction });

			return userWallet;
		};

		await txn.startTransaction(operations);

		return await txn.commitTransaction();
	} catch (error) {
		await txn.abortTransaction();

		throw error;
	}
}

module.exports = {
	getWalletsByUserId: WalletStore.getWalletsByUserId,
	isExceedMaxTransferAmountPerDayByUserIdWalletCodeAndAmount,
	transferByUserIdReceiverIdAndWalletCode,

	WALLET_PROJECTIONS: {
		MIN: WalletStore.MIN_PROJECTIONS,
	},
};

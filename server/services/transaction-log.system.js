const TransactionLogStore = require("../stores/transaction-log");

module.exports = {
	getPendingTransactionLogsByLotteryIdAndIssue: TransactionLogStore.getPendingTransactionLogsByLotteryIdAndIssue,

	TRANSACTION_LOG_PROJECTIONS: {
		COMMISSION_GRANTING: TransactionLogStore.COMMISSION_GRANTING_REQUIRED_PROJECTIONS,
	},
};

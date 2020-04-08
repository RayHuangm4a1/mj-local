const TransactionLogStore = require("../stores/transaction-log");

module.exports = {
	getFinishedTransactionLogsByUserIdDatesAndPagination: TransactionLogStore.getFinishedTransactionLogsByUserIdDatesAndPagination,

	TRANSACTION_LOG_PROJECTIONS: {
		MIN: TransactionLogStore.MIN_PROJECTIONS,
	},
};

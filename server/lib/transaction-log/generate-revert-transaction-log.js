const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");

module.exports = function (wallet, associatedTransactionLog) {
	return {
		userId: associatedTransactionLog.userId,
		username: associatedTransactionLog.username,
		associateId: associatedTransactionLog.associateId,
		lotteryId: associatedTransactionLog.lotteryId,
		issue: associatedTransactionLog.issue,
		type: ENUM_TRANSACTION_TYPE.STAFF_CANCELED,
		walletCode: wallet.code,
		amount: -associatedTransactionLog.amount,
		balance: wallet.balance,
		description: `撤回${associatedTransactionLog.description}`,
		status: ENUM_TRANSACTION_STATUS.DONE,
	};
};

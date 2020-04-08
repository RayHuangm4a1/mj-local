const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");

module.exports = function (wallet, betting) {
	return {
		userId: betting.userId,
		username: betting.username,
		associateId: betting.id,
		lotteryId: betting.lotteryId,
		issue: betting.issue,
		type: ENUM_TRANSACTION_TYPE.STAFF_CANCELED,
		walletCode: betting.walletCode,
		amount: betting.amount,
		balance: wallet.balance,
		description: `撤回投注金额`,
		status: ENUM_TRANSACTION_STATUS.DONE,
	};
};

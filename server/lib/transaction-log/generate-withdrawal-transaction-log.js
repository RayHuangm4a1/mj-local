const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");

module.exports = function (wallet, amount) {
	return {
		userId: wallet.userId,
		username: wallet.username,
		associateId: -1,
		type: ENUM_TRANSACTION_TYPE.WITHDRAWAL,
		walletCode: wallet.code,
		amount: -amount,
		balance: wallet.balance,
		description: `提现`,
		status: ENUM_TRANSACTION_STATUS.DONE,
	};
};

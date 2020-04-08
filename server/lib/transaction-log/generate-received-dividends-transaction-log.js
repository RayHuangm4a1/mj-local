const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");

module.exports = function (childrenUpdatedWallet, amount) {
	return {
		userId: childrenUpdatedWallet.userId,
		username: childrenUpdatedWallet.username,
		associateId: -1,
		type: ENUM_TRANSACTION_TYPE.DIVIDEND_RECEIVED,
		walletCode: childrenUpdatedWallet.code,
		amount,
		balance: childrenUpdatedWallet.balance,
		description: `收到上级发放的分红`,
		status: ENUM_TRANSACTION_STATUS.DONE,
	};
};

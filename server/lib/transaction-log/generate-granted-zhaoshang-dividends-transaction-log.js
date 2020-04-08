const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");

module.exports = function (updatedSupervisionWallet, amount) {
	return {
		userId: updatedSupervisionWallet.userId,
		username: updatedSupervisionWallet.username,
		associateId: -1,
		type: ENUM_TRANSACTION_TYPE.DIVIDEND_RECEIVED,
		walletCode: updatedSupervisionWallet.code,
		amount,
		balance: updatedSupervisionWallet.balance,
		description: `招商分红`,
		status: ENUM_TRANSACTION_STATUS.DONE,
	};
};

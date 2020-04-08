const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");

module.exports = function (previousSupervisionWallet) {
	return {
		userId: previousSupervisionWallet.userId,
		username: previousSupervisionWallet.username,
		associateId: -1,
		type: ENUM_TRANSACTION_TYPE.DIVIDEND_TRANSFER_OUT,
		walletCode: previousSupervisionWallet.code,
		amount: -previousSupervisionWallet.balance,
		balance: 0,
		description: `转入彩票钱包`,
		status: ENUM_TRANSACTION_STATUS.DONE,
	};
};
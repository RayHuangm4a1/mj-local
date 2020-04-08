const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");

module.exports = function (previousSupervisionWallet, afterTransferInWallet) {
	return {
		userId: afterTransferInWallet.userId,
		username: afterTransferInWallet.username,
		associateId: -1,
		type: ENUM_TRANSACTION_TYPE.DIVIDEND_TRANSFER_IN,
		walletCode: afterTransferInWallet.code,
		amount: previousSupervisionWallet.balance,
		balance: afterTransferInWallet.balance,
		description: `分红钱包转入`,
		status: ENUM_TRANSACTION_STATUS.DONE,
	};
};
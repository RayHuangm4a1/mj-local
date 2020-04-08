const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");

module.exports = function (userWallet, receiverWallet, amount) {
	const description = `${userWallet.username}给${receiverWallet.username}任意转账`;

	return [
		{
			userId: userWallet.userId,
			username: userWallet.username,
			associateId: -1,
			type: ENUM_TRANSACTION_TYPE.TRANSFER,
			walletCode: userWallet.code,
			amount: -amount,
			balance: userWallet.balance,
			description,
			status: ENUM_TRANSACTION_STATUS.DONE,
		},
		{
			userId: receiverWallet.userId,
			username: receiverWallet.username,
			associateId: -1,
			type: ENUM_TRANSACTION_TYPE.TRANSFER,
			walletCode: receiverWallet.code,
			amount,
			balance: receiverWallet.balance,
			description,
			status: ENUM_TRANSACTION_STATUS.DONE,
		}
	];
};

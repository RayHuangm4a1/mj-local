const Decimal = require("decimal.js");
const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");

module.exports = function (wallet, depositClass, confirmedDepositApplicationForm) {
	const { id, fee, amount } = confirmedDepositApplicationForm;

	return [
		{
			userId: wallet.userId,
			username: wallet.username,
			associateId: id,
			type: ENUM_TRANSACTION_TYPE.DEPOSIT,
			walletCode: wallet.code,
			amount,
			balance: new Decimal(wallet.balance).add(fee).toNumber(),
			description: depositClass.name,
			status: ENUM_TRANSACTION_STATUS.DONE,
		},
		{
			userId: wallet.userId,
			username: wallet.username,
			associateId: id,
			type: ENUM_TRANSACTION_TYPE.DEPOSIT,
			walletCode: wallet.code,
			amount: -fee,
			balance: wallet.balance,
			description: "充值手续费",
			status: ENUM_TRANSACTION_STATUS.DONE,
		}
	];
};

const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
	ENUM_WALLET_CODE,
} = require("../enum");
const {
	PRIMARY,
	SUPERVISION,
} = ENUM_WALLET_CODE;
const {
	DIVIDEND_GRANTED_FROM_PRIMARY,
	DIVIDEND_GRANTED_FROM_SUPERVISION,
} = ENUM_TRANSACTION_TYPE;
const WALLET_CODE_TRANSACTION_TYPE_MAPPING = {
	[PRIMARY]: DIVIDEND_GRANTED_FROM_PRIMARY,
	[SUPERVISION]: DIVIDEND_GRANTED_FROM_SUPERVISION,
};

module.exports = function (ancestorUpdatedWallet, childrenUpdatedWallet, amount) {
	return {
		userId: ancestorUpdatedWallet.userId,
		username: ancestorUpdatedWallet.username,
		associateId: -1,
		type: WALLET_CODE_TRANSACTION_TYPE_MAPPING[ancestorUpdatedWallet.code],
		walletCode: ancestorUpdatedWallet.code,
		amount: -amount,
		balance: ancestorUpdatedWallet.balance,
		description: `给直属下级[${childrenUpdatedWallet.username}]发放分红`,
		status: ENUM_TRANSACTION_STATUS.DONE,
	};
};

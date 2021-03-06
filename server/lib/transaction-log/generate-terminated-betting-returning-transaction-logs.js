const Decimal = require("decimal.js");
const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");
const {
	forEachRight,
} = require("ljit-collection");

module.exports = function (wallet, bettings) {
	const results = [];

	let balance = new Decimal(wallet.balance);

	forEachRight(bettings, betting => {
		results.push({
			userId: betting.userId,
			username: betting.username,
			associateId: betting.id,
			lotteryId: betting.lotteryId,
			issue: betting.issue,
			type: ENUM_TRANSACTION_TYPE.CANCEL_BETTING,
			walletCode: wallet.code,
			amount: betting.amount,
			balance: balance.toNumber(),
			description: "中后系统撤单",
			status: ENUM_TRANSACTION_STATUS.DONE,
		});

		balance = balance.sub(betting.amount);
	});

	return results.reverse();
};

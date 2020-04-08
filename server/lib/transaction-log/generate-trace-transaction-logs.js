const Decimal = require("decimal.js");
const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
} = require("../enum");
const {
	forEachRight,
} = require("ljit-collection");

module.exports = function (wallet, traces) {
	const results = [];

	let balance = new Decimal(wallet.balance);

	forEachRight(traces, trace => {
		results.push({
			userId: trace.userId,
			username: trace.username,
			associateId: trace.id,
			lotteryId: trace.lotteryId,
			issue: -1,
			type: ENUM_TRANSACTION_TYPE.TRACE,
			walletCode: wallet.code,
			amount: -trace.amount,
			balance: balance.toNumber(),
			description: `投注金额`,
			status: ENUM_TRANSACTION_STATUS.DONE,
		});

		balance = balance.add(trace.amount);
	});

	return results.reverse();
};

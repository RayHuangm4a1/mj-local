const Decimal = require("decimal.js");
const {
	ENUM_TRANSACTION_STATUS,
} = require("../enum");
const {
	forEachRight,
} = require("ljit-collection");

module.exports = function (wallet, transactionLogs) {
	const results = [];

	let balance = new Decimal(wallet.balance);

	forEachRight(transactionLogs, transactionLog => {
		results.push({
			id: transactionLog.id,
			balance: balance.toNumber(),
			status: ENUM_TRANSACTION_STATUS.DONE,
			createdAt: transactionLog.createdAt,
		});

		balance = balance.sub(transactionLog.amount);
	});

	return results.reverse();
};

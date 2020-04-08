const { sumBy } = require("ljit-collection");
const { convertTransactionLogToUserDailyStats } = require("./index");

module.exports = function (transactionLogs, date) {
	const {
		userId, username, walletCode,
	} = transactionLogs[0];

	const same = transactionLogs.every(transactionLog => {
		return transactionLog.userId === userId &&
			transactionLog.username === username &&
			transactionLog.walletCode === walletCode;
	});

	if (!same) {
		throw new Error("transaction logs are required belong to a user!");
	}

	const userDailyStatses = transactionLogs.map(transactionLog => convertTransactionLogToUserDailyStats(transactionLog));

	return {
		userId,
		username,
		walletCode,
		date,
		rebateAmount: sumBy(userDailyStatses, "rebateAmount"),
		fixedWageAmount: sumBy(userDailyStatses,"fixedWageAmount"),
	};
};

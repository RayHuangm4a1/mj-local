const {
	convertTransactionLogToUserDailyStats,
} = require("./index");

module.exports = function (transactionLog, walletCode) {
	const userDailyStats = convertTransactionLogToUserDailyStats(transactionLog);

	userDailyStats.walletCode = walletCode;

	return userDailyStats;
};

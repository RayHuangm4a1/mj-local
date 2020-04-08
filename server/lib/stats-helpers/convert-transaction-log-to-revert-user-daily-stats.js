const {
	convertTransactionLogToUserDailyStats,
} = require("./index");

module.exports = function (associatedTransactionLog) {
	const userDailyStats = convertTransactionLogToUserDailyStats(associatedTransactionLog);
	const {
		userId, username, walletCode,
		date, ...stats
	} = userDailyStats;

	const keys = Object.keys(stats);

	if (keys.length !== 1) {
		throw new Error("convert transaction log to user daily status error");
	}

	const key = keys.pop();

	return {
		userId,
		username,
		walletCode,
		date,
		[key]: -stats[key],
	};
};

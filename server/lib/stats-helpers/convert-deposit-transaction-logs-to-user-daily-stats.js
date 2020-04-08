const { sumBy } = require("ljit-collection");

module.exports = function (depositTransactionLogs, date) {
	const { userId, username, walletCode } = depositTransactionLogs[0];

	const same = depositTransactionLogs.every(depositTransactionLog => {
		return depositTransactionLog.userId === userId &&
			depositTransactionLog.username === username &&
			depositTransactionLog.walletCode === walletCode;
	});

	if (!same) {
		throw new Error("deposit transaction logs are required belong to a user!");
	}

	return {
		userId,
		username,
		walletCode,
		date,
		depositAmount: sumBy(depositTransactionLogs, "amount"),
	};
};

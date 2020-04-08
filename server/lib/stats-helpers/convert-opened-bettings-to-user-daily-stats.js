const { sumBy } = require("ljit-collection");

module.exports = function (bettings, date) {
	const { userId, username, walletCode } = bettings[0];

	const same = bettings.every(betting => {
		return betting.userId === userId &&
			betting.username === username &&
			betting.walletCode === walletCode;
	});

	if (!same) {
		throw new Error("bettings are required belong to a user!");
	}

	return {
		userId,
		username,
		walletCode,
		date,
		bettingAmount: sumBy(bettings, "amount"),
		bettingReward: sumBy(bettings, "reward"),
		rebateAmount: sumBy(bettings, "bettingRebateAmount"),
		fixedWageAmount: sumBy(bettings,"fixedWageAmount"),
	};
};

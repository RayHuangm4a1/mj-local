const Decimal = require("decimal.js");

module.exports = function generateWithdrawalFee({
	amount,
	userStats,
	userDailyStats,
	platform,
}) {

	const { withdrawalFees } = platform.withdrawalPolicy;
	const { damaAmount } = userStats;

	let withdrawalFee;

	if (userDailyStats.numOfWithdrawals > withdrawalFees.length) {
		withdrawalFee = withdrawalFees[withdrawalFees.length - 1];
	} else {
		withdrawalFee = withdrawalFees[userDailyStats.numOfWithdrawals];
	}

	const isAchievedDama = new Decimal(damaAmount).eq(0);

	const withdrawalFeePercentage = isAchievedDama
		? withdrawalFee.zeroDamaAmountPercentage
		: withdrawalFee.nonZeroDamaAmountPercentage;

	return new Decimal(amount)
		.mul(withdrawalFeePercentage)
		.div(100)
		.toNumber();
};

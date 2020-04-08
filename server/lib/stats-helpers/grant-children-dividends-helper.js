const Decimal = require("decimal.js");
const {
	ENUM_DIVIDEND_STATUS,
} = require("../enum");

function getProfitInDecimal(teamDurationStats) {
	const {
		bettingReward, rebateAmount, activityAmount,
		fixedWageAmount, bettingAmount, incentiveAmount,
	} = teamDurationStats;

	return new Decimal(bettingReward)
		.add(rebateAmount)
		.add(activityAmount)
		.add(fixedWageAmount)
		.add(incentiveAmount)
		.sub(bettingAmount);
}

function getGrantableAmount(teamDurationStats) {
	const profitInDecimal = getProfitInDecimal(teamDurationStats);

	if (profitInDecimal.gte(0)) {
		return 0;
	}

	return profitInDecimal.abs()
		.toNumber();
}

function getTotalGrantedAmount(teamDurationStats, amount) {
	const { grantedAmount } = teamDurationStats;

	return new Decimal(grantedAmount)
		.add(amount)
		.toNumber();
}

function isGrantable(teamDurationStats) {
	const { status } = teamDurationStats;
	const { NOT_GRANTED, PARTIAL_GRANTED } = ENUM_DIVIDEND_STATUS;

	return status === NOT_GRANTED || status === PARTIAL_GRANTED;
}

function isGrantedAmountExceedProfit(teamDurationStats, amount) {
	const totalGrantedAmount = getTotalGrantedAmount(teamDurationStats, amount);
	const grantableAmount = getGrantableAmount(teamDurationStats);

	return totalGrantedAmount > grantableAmount;
}

function isPartialGranted(teamDurationStats, amount) {
	const { maxGrantAmount } = teamDurationStats;
	const totalGrantedAmount = getTotalGrantedAmount(teamDurationStats, amount);

	return totalGrantedAmount < maxGrantAmount;
}

function isFullGranted(teamDurationStats, amount) {
	const { maxGrantAmount } = teamDurationStats;
	const totalGrantedAmount = getTotalGrantedAmount(teamDurationStats, amount);

	return totalGrantedAmount >= maxGrantAmount;
}

module.exports = {
	getProfitInDecimal,
	getGrantableAmount,
	getTotalGrantedAmount,
	isGrantable,
	isGrantedAmountExceedProfit,
	isPartialGranted,
	isFullGranted,
};

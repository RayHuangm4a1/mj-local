import Big from 'big.js';

export function getProfitAmount(stat = {}) {
	const {
		bettingReward,
		bettingAmount,
		incentiveAmount,
		fixedWageAmount,
		activityAmount,
		rebateAmount,
	} = stat;

	const profit = new Big(bettingReward)
		.minus(new Big(bettingAmount))
		.plus(new Big(incentiveAmount))
		.plus(new Big(fixedWageAmount))
		.plus(new Big(activityAmount))
		.plus(new Big(rebateAmount));

	return parseFloat(profit);
}

export function getEncourageAmount(stat = {}) {
	const {
		incentiveAmount,
		fixedWageAmount,
		activityAmount
	} = stat;

	const encourage = new Big(incentiveAmount)
		.plus(new Big(fixedWageAmount))
		.plus(new Big(activityAmount));

	return parseFloat(encourage);
}

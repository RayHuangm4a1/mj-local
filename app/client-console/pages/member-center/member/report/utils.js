import Big from 'big.js';
import { convertDateStringToTimestamp, } from '../../../../../lib/moment-utils';

export const PREFIX_CLASS = 'member-report';

export const getProfit = (record) => {
	const { bettingReward, bettingAmount, fixedWageAmount, activityAmount, rebateAmount, incentiveAmount, } = record;

	return parseFloat(
		new Big(bettingReward)
			.minus(bettingAmount)
			.plus(incentiveAmount)
			.plus(fixedWageAmount)
			.plus(activityAmount)
			.plus(rebateAmount)
	);
};

// TODO reward calculate may change
export const getReward = (record) => {
	const { fixedWageAmount, activityAmount, incentiveAmount, } = record;

	return parseFloat(new Big(fixedWageAmount).plus(incentiveAmount).plus(activityAmount));
};

export const dateSorter = (prev, next) => {
	const prevDate = prev === '汇总'? Infinity : prev.date;
	const nextDate = next === '汇总'? Infinity : next.date;

	return convertDateStringToTimestamp(prevDate) - convertDateStringToTimestamp(nextDate);
};

export const functionSorter = (func) => {
	return (prev, next) => func(prev) - func(next);
};

export const fieldSorter = (field) => {
	return (prev, next) => prev[field] - next[field];
};

// TODO generate third party total data and move to reducer
export function generateDataWithTotal(currentData, totalData) {
	return [...[Object.assign({}, totalData, { date: '汇总' })], ...currentData];
}

export const GameTypeEnums = {
	LOTTERY: 'lottery',
	THIRD_PARTY: 'thirdParty',
};

export function isLotteryGameType(gameType) {
	return gameType === GameTypeEnums.LOTTERY;
}

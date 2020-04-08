import Big from 'big.js';
import { calculateTotalAmountAndReward } from './zhui-hao-generators/utils';
import {
	calculateAmount,
	calculateProfit,
	calculateProfitRate,
} from './betting-utils';

function getAccumulation(traceBettingsData = [], index = 0) {
	if (index > 0 && traceBettingsData[index - 1]) {
		return parseFloat(
			new Big(traceBettingsData[index - 1].accumulation).plus(new Big(traceBettingsData[index].amount))
		);
	}
	if (index === 0 && traceBettingsData[index]) {
		return traceBettingsData[0].amount;
	}
	return 0;
}

export function updateTraceRowData(bettings, prevTableData, index, nextMultiple) {
	const {
		totalAmount,
		totalReward,
	} = calculateTotalAmountAndReward(bettings);
	const rows = prevTableData.length;

	let nextTableData = prevTableData.slice();

	const nextAmount = calculateAmount(totalAmount, nextMultiple);
	const nextReward = parseFloat(new Big(nextMultiple).times(new Big(totalReward)));

	nextTableData[index] = Object.assign({}, nextTableData[index], {
		multiple: nextMultiple,
		amount: nextAmount,
		reward: nextReward,
	});
	for (let i = index; i < rows; i++) {
		const accumulation = getAccumulation(nextTableData, i);
		const profit = calculateProfit(nextReward, accumulation);
		const profitRate = calculateProfitRate(nextReward, accumulation);

		nextTableData[i] = Object.assign({}, nextTableData[i], {
			accumulation,
			profit,
			profitRate,
		});
	}
	return nextTableData;
}

export function getAccumulateValue(traceBettingsData = [], propName) {
	if (traceBettingsData.length > 0) {
		const accumulate = (accumulator, value) => accumulator.plus(value);

		return parseFloat(
			traceBettingsData.map(item => item[propName]).reduce(accumulate, new Big(0))
		);
	}
	return 0;
}

export function generateTraces(bettingsData, options) {
	const {
		multiples = [],
		isTerminatedIfNotOpened = true,
		isTerminatedIfWin = true,
	} = options;

	return bettingsData.map(traceBetting => {
		const { play, weizhi, betcontent, amountPerBet, rebate, } = traceBetting;
		const { id: playId, } = play;

		return Object.assign({}, {
			playId,
			betcontent,
			weizhi,
			amountPerBet,
			rebate,
		}, {
			multiples,
			isTerminatedIfNotOpened,
			isTerminatedIfWin,
		});
	});
}

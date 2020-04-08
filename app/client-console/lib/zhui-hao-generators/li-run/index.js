import Big from 'big.js';
import { calculateTotalAmountAndReward } from '../utils';
import {
	calculateAmount,
	calculateProfit,
	calculateProfitRate,
} from '../../betting-utils';

function generate(bettings, {
	zuiDiShoYi,   // 最低收益率
	qiShiBeiShu,  // 起始倍數
	zhuiHaoQiShu, // 追號期數
}) {
	const {
		totalAmount,
		totalReward,
	} = calculateTotalAmountAndReward(bettings);

	const profitRate = parseFloat(
		new Big(1).plus(new Big(zuiDiShoYi).div(100))
	);

	let prevTotalAmount = 0;
	let results = [];

	for (let i = 0; i < zhuiHaoQiShu; i++) {
		let multiple = getMultiple(profitRate, prevTotalAmount, totalAmount, totalReward);

		multiple = multiple > qiShiBeiShu ? multiple : qiShiBeiShu;
		const amount = calculateAmount(totalAmount, multiple);
		const reward = parseFloat(new Big(totalReward).times(new Big(multiple)));

		prevTotalAmount = parseFloat(new Big(prevTotalAmount).plus(new Big(amount)));

		const profit = calculateProfit(reward, prevTotalAmount);

		results.push({
			index: i + 1,
			multiple,
			amount,
			reward,
			accumulation: prevTotalAmount,
			profit,
			profitRate: calculateProfitRate(reward, prevTotalAmount),
		});
	}

	return results;
}

export default {
	generate
};

function getMultiple(profitRate, prevTotalAmount, totalAmount, reward) {
	const top = profitRate * prevTotalAmount;
	const bottom = profitRate * totalAmount - reward;

	return Math.ceil(-top/bottom);
}

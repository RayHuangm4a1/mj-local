import Big from 'big.js';
import { calculateTotalAmountAndReward } from '../utils';
import {
	calculateAmount,
} from '../../betting-utils';

function generate(bettings, {
	qiShiBeiShu = 1,  // 起始倍數
	zhuiHaoQiShu = 0, // 追號期數
}) {
	const {
		totalAmount,
		totalReward,
	} = calculateTotalAmountAndReward(bettings);

	let prevTotalAmount = 0;
	let results = [];

	for (let i = 0; i < zhuiHaoQiShu; i++) {
		const amount = calculateAmount(totalAmount, qiShiBeiShu);

		prevTotalAmount = parseFloat(new Big(prevTotalAmount).plus(new Big(amount)));

		results.push({
			index: i + 1,
			multiple: qiShiBeiShu,
			amount,
			reward: parseFloat(new Big(totalReward).times(new Big(qiShiBeiShu))),
			accumulation: prevTotalAmount,
		});
	}

	return results;
}


export default {
	generate
};

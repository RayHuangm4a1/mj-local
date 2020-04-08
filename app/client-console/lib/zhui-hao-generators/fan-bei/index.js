import Big from 'big.js';
import { calculateTotalAmountAndReward } from '../utils';

function generate(bettings, {
	qiShiBeiShu,  // 起始倍數
	zhuiHaoQiShu, // 追號期數
	perQiShu,     // 隔幾期
	plusBeiShu,	  // 倍數
}) {
	const {
		totalAmount,
		totalReward,
	} = calculateTotalAmountAndReward(bettings);

	let prevTotal = new Big(0);
	let results = [];
	let additionalMultiple = new Big(qiShiBeiShu);

	for (let i = 0; i < zhuiHaoQiShu; i++) {
		if (i > 0 && (i % perQiShu === 0)) {
			additionalMultiple = additionalMultiple.times(new Big(plusBeiShu));
		}
		const amount = new Big(totalAmount).times(additionalMultiple);

		prevTotal = prevTotal.plus(amount);

		results.push({
			index: i + 1,
			multiple: parseFloat(additionalMultiple),
			amount: parseFloat(amount),
			reward: parseFloat(new Big(totalReward).times(new Big(additionalMultiple))),
			accumulation: parseFloat(prevTotal),
		});
	}

	return results;
}

export default {
	generate
};

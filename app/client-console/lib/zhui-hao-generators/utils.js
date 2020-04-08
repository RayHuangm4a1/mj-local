import Big from 'big.js';
import { calculateReward } from '../betting-utils';

export function calculateTotalAmountAndReward(bettings) {
	return bettings.reduce(function (reduced, betting) {
		const reward = calculateReward(betting.amountPerBet, betting.play.bonus, 1);

		return {
			totalAmount: parseFloat(new Big(reduced.totalAmount).plus(new Big(betting.amount))),
			totalReward: parseFloat(new Big(reduced.totalReward).plus(new Big(reward))),
		};
	}, {
		totalAmount: 0,	// 全部單子的一倍總金額多少
		totalReward: 0,	// 全部單子的一倍總獎金
	});
}

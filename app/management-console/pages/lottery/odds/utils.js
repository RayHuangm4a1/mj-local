import Big from 'big.js';

const AWARD_RATIO = 20;

export function getBonusPercent(bonus, platformBonus) {
	return parseFloat((new Big(bonus).minus(new Big(platformBonus))).div(new Big(AWARD_RATIO)));
}

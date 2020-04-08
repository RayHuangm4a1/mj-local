import Big from 'big.js';

export function calculateUserBonus(platform = {}, user = {}) {
	const {
		bonus: platformBonus = {},
	} = platform;
	const platformMaxBonus = platformBonus.max;
	const deltaBonus = user.deltaBonus;

	return calculateBonus(platformMaxBonus, deltaBonus);
}

export function calculatePlaysBonusByUser(platformBonus = {}, userDeltaBonus = 0, playAwards = {}, awardKey) {
	const objectKey = Object.keys(playAwards)[0];
	const award = awardKey ? awardKey : objectKey;
	const { numerator = 0, denominator = 0, deltaBonus: playBonusDelta = 0 } = playAwards[award];
	const max = platformBonus.max ? platformBonus.max : 0;

	const platformMaxBonus = new Big(max);
	const _numerator = new Big(numerator);
	const p =  _numerator.div(denominator);
	const bonus = (platformMaxBonus.plus(userDeltaBonus).plus(playBonusDelta)).div(1000).div(p);

	return parseFloat(bonus);
}

export function calculateOdds(unit, bonus) {
	const _unit = new Big(unit);
	const odds = _unit.div(2).times(bonus);

	return parseFloat(odds);
}

export function calculateBonus(platformMaxBonus, deltaBonus) {
	const _platformMaxBonus = new Big(platformMaxBonus);

	return parseFloat(_platformMaxBonus.plus(deltaBonus));
}

export function calculateDeltaBonus(platformMaxBonus, bonus) {
	const _bonus = new Big(bonus);

	return parseFloat(_bonus.minus(platformMaxBonus));
}

export function calculateRebate(bonus, minBonus = 1700, ratio = 20) {
	const _bonus = new Big(bonus);

	return parseFloat((_bonus.minus(minBonus)).div(ratio));
}

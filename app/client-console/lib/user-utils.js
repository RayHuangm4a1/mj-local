import { calculateUserBonus, } from '../../lib/bonus-utils';

export function getUserData(platform = {}, user = {}) {
	const userBonus = calculateUserBonus(platform, user);

	return {
		...user,
		bonus: userBonus,
	};
}

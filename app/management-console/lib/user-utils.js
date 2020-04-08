import { calculateUserBonus, } from '../../lib/bonus-utils';

export function getUserData(platform = {}, user = {}) {
	const userBonus = calculateUserBonus(platform, user);

	return {
		...user,
		bonus: userBonus,
	};
}

export function getLastCommentDescription(comments = []) {
	return comments.length ? comments[0].description : '无资料';
}
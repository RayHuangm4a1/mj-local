import {
	START_FETCH_USER_WALLETS,
	FETCH_USER_WALLETS_SUCCESS,
	FETCH_USER_WALLETS_FAILED,
} from '../action-types';

export function fetchUserWalletsAction(userId) {
	return {
		type: START_FETCH_USER_WALLETS,
		userId,
	};
}
export function fetchUserWalletsSuccessAction(wallets) {
	return {
		type: FETCH_USER_WALLETS_SUCCESS,
		wallets,
	};
}
export function fetchUserWalletsFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_WALLETS_FAILED,
		error,
		errorMessage,
	};
}

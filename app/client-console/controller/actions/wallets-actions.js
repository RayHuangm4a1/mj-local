import {
	START_FETCH_WALLETS,
	FETCH_WALLETS_SUCCESS,
	FETCH_WALLETS_FAILED,
	UPDATE_WALLET,
} from './action-types';

export function fetchWalletsAction() {
	return {
		type: START_FETCH_WALLETS,
	};
}

export function fetchWalletsSuccessAction(wallets = []) {
	return {
		type: FETCH_WALLETS_SUCCESS,
		wallets,
	};
}

export function fetchWalletsFailedAction(error, errorMessage) {
	return {
		type: FETCH_WALLETS_FAILED,
		error,
		errorMessage,
	};
}

export function updateWallet(wallet = {}) {
	return {
		type: UPDATE_WALLET,
		wallet,
	};
}

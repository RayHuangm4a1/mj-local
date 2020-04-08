import {
	START_FETCH_LOTTERIES,
	FETCH_LOTTERIES_SUCCESS,
	FETCH_LOTTERIES_FAILED,
} from './action-types';

export function fetchLotteriesAction(query = {}) {
	return {
		type: START_FETCH_LOTTERIES,
		query,
	};
}
export function fetchLotteriesSuccessAction(lotteries = []) {
	return {
		type: FETCH_LOTTERIES_SUCCESS,
		lotteries,
	};
}
export function fetchLotteriesFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERIES_FAILED,
		error,
		errorMessage,
	};
}

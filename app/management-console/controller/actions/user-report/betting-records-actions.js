import {
	START_FETCH_BETTING_RECORDS,
	FETCH_BETTING_RECORDS_SUCCESS,
	FETCH_BETTING_RECORDS_FAILED,
} from '../action-types';

export function fetchBettingRecordsAction(query) {
	return {
		type: START_FETCH_BETTING_RECORDS,
		query
	};
}

export function fetchBettingRecordsSuccessAction({ data = [], numOfItems = 0, numOfPages = 1, page = 1 }) {
	return {
		type: FETCH_BETTING_RECORDS_SUCCESS,
		data,
		numOfItems,
		numOfPages,
		page,
	};
}

export function fetchBettingRecordsFailedAction(error, errorMessage) {
	return {
		type: FETCH_BETTING_RECORDS_FAILED,
		error,
		errorMessage,
	};
}

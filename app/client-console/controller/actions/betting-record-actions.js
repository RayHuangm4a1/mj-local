import {
	START_FETCH_BETTING_RECORDS,
	FETCH_BETTING_RECORDS_SUCCESS,
	FETCH_BETTING_RECORDS_FAILED,
	START_DISCARD_BETTING_RECORD,
	DISCARD_BETTING_RECORD_SUCCESS,
	DISCARD_BETTING_RECORD_FAILED,
	PREPEND_BETTING_RECORDS,
	START_FETCH_LATEST_BETTING_RECORDS,
	FETCH_LATEST_BETTING_RECORDS_SUCCESS,
	FETCH_LATEST_BETTING_RECORDS_FAILED,
} from './action-types';

export function fetchBettingRecordsAction(query) {
	return {
		type: START_FETCH_BETTING_RECORDS,
		query,
	};
}
export function fetchBettingRecordsSuccessAction({ data = [], numOfItems = 0, numOfPages = 0, page = 1 }) {
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

export function discardBettingRecordAction(id) {
	return {
		type: START_DISCARD_BETTING_RECORD,
		id,
	};
}
export function discardBettingRecordSuccessAction(payload) {
	return {
		type: DISCARD_BETTING_RECORD_SUCCESS,
		payload,
	};
}
export function discardBettingRecordFailedAction(error, errorMessage) {
	return {
		type: DISCARD_BETTING_RECORD_FAILED,
		error,
		errorMessage,
	};
}

export function prependBettingRecordsAction(results) {
	return {
		type: PREPEND_BETTING_RECORDS,
		results,
	};
}

export function fetchLatestBettingRecordsAction() {
	return {
		type: START_FETCH_LATEST_BETTING_RECORDS,
	};
}
export function fetchLatestBettingRecordsSuccessAction({ data = [], numOfItems = 0, numOfPages = 0, page = 1 }) {
	return {
		type: FETCH_LATEST_BETTING_RECORDS_SUCCESS,
		data,
		numOfItems,
		numOfPages,
		page,
	};
}
export function fetchLatestBettingRecordsFailedAction(error, errorMessage) {
	return {
		type: FETCH_LATEST_BETTING_RECORDS_FAILED,
		error,
		errorMessage,
	};
}

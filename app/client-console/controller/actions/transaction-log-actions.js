import {
	START_FETCH_TRANSACTION_LOGS,
	FETCH_TRANSACTION_LOGS_SUCCESS,
	FETCH_TRANSACTION_LOGS_FAILED,
} from './action-types';

export function fetchTransactionLogsAction(query) {
	return {
		type: START_FETCH_TRANSACTION_LOGS,
		query
	};
}

export function fetchTransactionLogsSuccessAction({ data = [], numOfItems = 0, numOfPages = 0, page = 1 }) {
	return {
		type: FETCH_TRANSACTION_LOGS_SUCCESS,
		data,
		numOfItems,
		numOfPages,
		page,
	};
}

export function fetchTransactionLogsFailedAction(error, errorMessage) {
	return {
		type: FETCH_TRANSACTION_LOGS_FAILED,
		error,
		errorMessage,
	};
}

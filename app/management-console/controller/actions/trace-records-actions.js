import {
	START_FETCH_TRACE_RECORDS,
	FETCH_TRACE_RECORDS_SUCCESS,
	FETCH_TRACE_RECORDS_FAILED,
} from './action-types';

export function fetchTraceRecordsAction() {
	return {
		type: START_FETCH_TRACE_RECORDS,
	};
}

export function fetchTraceRecordsSuccessAction(data = {}) {
	const {
		traceRecords,
		page,
		numOfItems,
		numOfPages,
	} = data;

	return {
		type: FETCH_TRACE_RECORDS_SUCCESS,
		traceRecords,
		page,
		numOfItems,
		numOfPages,
	};
}

export function fetchTraceRecordsFailedAction(error, errorMessage) {
	return {
		type: FETCH_TRACE_RECORDS_FAILED,
		error,
		errorMessage,
	};
}

import {
	START_FETCH_TRACE_RECORDS,
	FETCH_TRACE_RECORDS_SUCCESS,
	FETCH_TRACE_RECORDS_FAILED,
	SET_SELECTED_TRACE_RECORD,
	START_FETCH_TRACE_RECORD,
	FETCH_TRACE_RECORD_SUCCESS,
	FETCH_TRACE_RECORD_FAILED,
	PREPEND_LATEST_TRACE_RECORDS,
	START_FETCH_LATEST_TRACE_RECORDS,
	FETCH_LATEST_TRACE_RECORDS_SUCCESS,
	FETCH_LATEST_TRACE_RECORDS_FAILED,
} from './action-types';

export function fetchTraceRecordsAction(queries) {
	return {
		type: START_FETCH_TRACE_RECORDS,
		queries,
	};
}
export function fetchTraceRecordsSuccessAction({ data = [], numOfItems = 0, numOfPages = 0, page = 1 }) {
	return {
		type: FETCH_TRACE_RECORDS_SUCCESS,
		data,
		numOfItems,
		numOfPages,
		page,
	};
}
export function fetchTraceRecordsFailedAction(error, errorMessage) {
	return {
		type: FETCH_TRACE_RECORDS_FAILED,
		error,
		errorMessage,
	};
}

export function setSelectedTraceRecordAction(selectedTraceRecord) {
	return {
		type: SET_SELECTED_TRACE_RECORD,
		selectedTraceRecord,
	};
}
export function fetchTraceRecordAction(traceId) {
	return {
		type: START_FETCH_TRACE_RECORD,
		traceId,
	};
}
export function fetchTraceRecordSuccessAction(traceRecord) {
	return {
		type: FETCH_TRACE_RECORD_SUCCESS,
		traceRecord,
	};
}
export function fetchTraceRecordFailedAction(error, errorMessage) {
	return {
		type: FETCH_TRACE_RECORD_FAILED,
		error,
		errorMessage,
	};
}

export function prependLatestTraceRecordsAction(traceRecords) {
	return {
		type: PREPEND_LATEST_TRACE_RECORDS,
		traceRecords,
	};
}

export function fetchLatestTraceRecordsAction() {
	return {
		type: START_FETCH_LATEST_TRACE_RECORDS,
	};
}
export function fetchLatestTraceRecordsSuccessAction({ data = [], numOfItems = 0, numOfPages = 0, page = 1 }) {
	return {
		type: FETCH_LATEST_TRACE_RECORDS_SUCCESS,
		data,
		numOfItems,
		numOfPages,
		page,
	};
}
export function fetchLatestTraceRecordsFailedAction(error, errorMessage) {
	return {
		type: FETCH_LATEST_TRACE_RECORDS_FAILED,
		error,
		errorMessage,
	};
}

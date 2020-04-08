import {
	START_FETCH_TRACE_RECORD_BETTINGS,
	FETCH_TRACE_RECORD_BETTINGS_SUCCESS,
	FETCH_TRACE_RECORD_BETTINGS_FAILED,
	START_DISCARD_TRACE_RECORD_BETTINGS,
	DISCARD_TRACE_RECORD_BETTINGS_SUCCESS,
	DISCARD_TRACE_RECORD_BETTINGS_FAILED,
} from './action-types';

export function fetchTraceRecordBettingsAction(traceId, queries) {
	return {
		type: START_FETCH_TRACE_RECORD_BETTINGS,
		traceId,
		queries,
	};
}
export function fetchTraceRecordBettingsSuccessAction({ data = [], numOfItems = 0, numOfPages = 0, page = 1 }) {
	return {
		type: FETCH_TRACE_RECORD_BETTINGS_SUCCESS,
		data,
		numOfItems,
		numOfPages,
		page,
	};
}
export function fetchTraceRecordBettingsFailedAction(error, errorMessage) {
	return {
		type: FETCH_TRACE_RECORD_BETTINGS_FAILED,
		error,
		errorMessage,
	};
}

export function discardTraceRecordBettingsAction(traceId, selectedBettingIds) {
	return {
		type: START_DISCARD_TRACE_RECORD_BETTINGS,
		traceId,
		selectedBettingIds,
	};
}
export function discardTraceRecordBettingsSuccessAction(discardedTraceRecordBettings) {
	return {
		type: DISCARD_TRACE_RECORD_BETTINGS_SUCCESS,
		discardedTraceRecordBettings,
	};
}
export function discardTraceRecordBettingsFailedAction(error, errorMessage) {
	return {
		type: DISCARD_TRACE_RECORD_BETTINGS_FAILED,
		error,
		errorMessage,
	};
}

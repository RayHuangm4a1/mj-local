import {
	START_FETCH_TRACE_RECORD_BETTINGS,
	FETCH_TRACE_RECORD_BETTINGS_SUCCESS,
	FETCH_TRACE_RECORD_BETTINGS_FAILED,
} from './action-types';

export function fetchTraceRecordBettingsAction() {
	return {
		type: START_FETCH_TRACE_RECORD_BETTINGS,
	};
}

export function fetchTraceRecordBettingsSuccessAction(data = {}) {
	const {
		traceBettings = [],
		page = 1,
		numOfItems = 0,
		numOfPages = 1,
	} = data;

	return {
		type: FETCH_TRACE_RECORD_BETTINGS_SUCCESS,
		traceBettings,
		page,
		numOfItems,
		numOfPages,
	};
}

export function fetchTraceRecordBettingsFailedAction(error, errorMessage) {
	return {
		type: FETCH_TRACE_RECORD_BETTINGS_FAILED,
		error,
		errorMessage,
	};
}

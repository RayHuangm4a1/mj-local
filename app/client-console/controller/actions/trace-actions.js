import {
	START_TRACE,
	TRACE_SUCCESS,
	TRACE_FAILED,
} from './action-types';

export function startTraceAction(lotteryId, traces, password) {
	return {
		type: START_TRACE,
		lotteryId,
		traces,
		password,
	};
}

export function traceSuccessAction() {
	return {
		type: TRACE_SUCCESS,
	};
}

export function traceFailedAction(error, errorMessage) {
	return {
		type: TRACE_FAILED,
		error,
		errorMessage,
	};
}

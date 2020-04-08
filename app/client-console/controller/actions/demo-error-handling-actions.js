import {
	START_FETCH_DEMO_ERROR_HANDLING,
	FETCH_DEMO_ERROR_HANDLING_SUCCESS,
	FETCH_DEMO_ERROR_HANDLING_FAILED,
} from './action-types';

export function fetchDemoErrorHandlingAction() {
	return {
		type: START_FETCH_DEMO_ERROR_HANDLING,
	};
}
export function fetchDemoErrorHandlingSuccessAction() {
	return {
		type: FETCH_DEMO_ERROR_HANDLING_SUCCESS,
	};
}
export function fetchDemoErrorHandlingFailedAction(error, errorMessage) {
	return {
		type: FETCH_DEMO_ERROR_HANDLING_FAILED,
		error,
		errorMessage,
	};
}

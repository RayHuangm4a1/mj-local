import {
	START_INITIALIZE_APPLICATION,
	INITIALIZE_APPLICATION_SUCCESS,
	INITIALIZE_APPLICATION_FAILED,
} from './action-types';

export function initializeApplicationAction() {
	return {
		type: START_INITIALIZE_APPLICATION,
	};
}
export function initializeApplicationSuccessAction() {
	return {
		type: INITIALIZE_APPLICATION_SUCCESS,
	};
}
export function initializeApplicationFailedAction() {
	return {
		type: INITIALIZE_APPLICATION_FAILED,
	};
}

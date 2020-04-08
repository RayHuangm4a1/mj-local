import {
	START_FETCH_PLATFORM,
	FETCH_PLATFORM_SUCCESS,
	FETCH_PLATFORM_FAILED,
} from './action-types';

export function fetchPlatformAction(query = {}) {
	return {
		type: START_FETCH_PLATFORM,
		query,
	};
}
export function fetchPlatformSuccessAction(platform = {}) {
	return {
		type: FETCH_PLATFORM_SUCCESS,
		platform,
	};
}
export function fetchPlatformFailedAction(error, errorMessage) {
	return {
		type: FETCH_PLATFORM_FAILED,
		error,
		errorMessage,
	};
}

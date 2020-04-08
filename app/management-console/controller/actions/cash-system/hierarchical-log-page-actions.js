import {
	START_FETCH_USER_LEVEL_LOGS,
	FETCH_USER_LEVEL_LOGS_SUCCESS,
	FETCH_USER_LEVEL_LOGS_FAILED,
} from '../action-types';

export function fetchUserLevelLogsAction(queries) {
	return {
		type: START_FETCH_USER_LEVEL_LOGS,
		queries
	};
}

export function fetchUserLevelLogsSuccessAction({ data, numOfItems, numOfPages, }) {
	return {
		type: FETCH_USER_LEVEL_LOGS_SUCCESS,
		data,
		numOfItems,
		numOfPages
	};
}

export function fetchUserLevelLogsFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_LEVEL_LOGS_FAILED,
		error,
		errorMessage,
	};
}

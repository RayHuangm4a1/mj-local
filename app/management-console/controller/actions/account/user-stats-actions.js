import {
	START_FETCH_USER_STATS,
	FETCH_USER_STATS_SUCCESS,
	FETCH_USER_STATS_FAILED,
} from '../action-types';

export function fetchUserStatsAction(userId) {
	return {
		type: START_FETCH_USER_STATS,
		userId,
	};
}

export function fetchUserStatsSuccessAction(stats) {
	return {
		type: FETCH_USER_STATS_SUCCESS,
		stats,
	};
}

export function fetchUserStatsFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_STATS_FAILED,
		error,
		errorMessage,
	};
}

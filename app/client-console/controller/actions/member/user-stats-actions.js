import {
	START_FETCH_USER_STATS,
	FETCH_USER_STATS_SUCCESS,
	FETCH_USER_STATS_FAILED,
} from '../action-types';

export function fetchUserStatsAction(queries = {}) {
	return {
		type: START_FETCH_USER_STATS,
		queries,
	};
}

export function fetchUserStatsSuccessAction(userStats) {
	return {
		type: FETCH_USER_STATS_SUCCESS,
		userStats
	};
}

export function fetchUserStatsFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_STATS_FAILED,
		error,
		errorMessage,
	};
}

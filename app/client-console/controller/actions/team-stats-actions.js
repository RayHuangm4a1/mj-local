import {
	START_FETCH_TEAM_STATS,
	FETCH_TEAM_STATS_SUCCESS,
	FETCH_TEAM_STATS_FAILED,
} from './action-types';

export function fetchTeamStatsAction() {
	return {
		type: START_FETCH_TEAM_STATS,
	};
}

export function fetchTeamStatsSuccessAction(teamStats) {
	return {
		type: FETCH_TEAM_STATS_SUCCESS,
		teamStats,
	};
}

export function fetchTeamStatsFailedAction(error, errorMessage) {
	return {
		type: FETCH_TEAM_STATS_FAILED,
		error,
		errorMessage,
	};
}

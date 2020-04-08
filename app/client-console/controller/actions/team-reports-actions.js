import {
	START_FETCH_TEAM_REPORTS,
	FETCH_TEAM_REPORTS_SUCCESS,
	FETCH_TEAM_REPORTS_FAILED,
} from './action-types';

export function fetchTeamReportsAction(userIdOrUsername, query = {}) {
	return {
		type: START_FETCH_TEAM_REPORTS,
		userIdOrUsername,
		query,
	};
}

export function fetchTeamReportsSuccessAction(teamReports = {}) {
	return {
		type: FETCH_TEAM_REPORTS_SUCCESS,
		teamReports,
	};
}

export function fetchTeamReportsFailedAction(error, errorMessage) {
	return {
		type: FETCH_TEAM_REPORTS_FAILED,
		error,
		errorMessage,
	};
}

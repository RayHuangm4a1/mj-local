import {
	START_FETCH_TEAM_BETTING_RECORDS,
	FETCH_TEAM_BETTING_RECORDS_SUCCESS,
	FETCH_TEAM_BETTING_RECORDS_FAILED,
} from './action-types';

export function fetchTeamBettingRecordsAction(queries = {}) {
	return {
		type: START_FETCH_TEAM_BETTING_RECORDS,
		queries,
	};
}
export function fetchTeamBettingRecordsSuccessAction({ page, numOfItems, numOfPages, data, }) {
	return {
		type: FETCH_TEAM_BETTING_RECORDS_SUCCESS,
		page,
		numOfItems,
		numOfPages,
		data,
	};
}
export function fetchTeamBettingRecordsFailedAction(error, errorMessage) {
	return {
		type: FETCH_TEAM_BETTING_RECORDS_FAILED,
		error,
		errorMessage,
	};
}

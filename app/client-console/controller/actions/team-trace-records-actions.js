import {
	START_FETCH_TEAM_TRACE_RECORDS,
	FETCH_TEAM_TRACE_RECORDS_SUCCESS,
	FETCH_TEAM_TRACE_RECORDS_FAILED,
	START_FETCH_TEAM_TRACE_RECORD_DETAIL,
	FETCH_TEAM_TRACE_RECORD_DETAIL_SUCCESS,
	FETCH_TEAM_TRACE_RECORD_DETAIL_FAILED,
	START_FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS,
	FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS_SUCCESS,
	FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS_FAILED,
} from './action-types';

export function fetchTeamTraceRecordsAction(queries) {
	return {
		type: START_FETCH_TEAM_TRACE_RECORDS,
		queries,
	};
}
export function fetchTeamTraceRecordsSuccessAction({
	data = [],
	numOfItems,
	numOfPages
} = {}) {
	return {
		type: FETCH_TEAM_TRACE_RECORDS_SUCCESS,
		teamTraceRecords: data,
		numOfItems,
		numOfPages,
	};
}
export function fetchTeamTraceRecordsFailedAction(error, errorMessage) {
	return {
		type: FETCH_TEAM_TRACE_RECORDS_FAILED,
		error,
		errorMessage,
	};
}

export function fetchTeamTraceRecordDetailAction(memberId, traceId) {
	return {
		type: START_FETCH_TEAM_TRACE_RECORD_DETAIL,
		memberId,
		traceId,
	};
}
export function fetchTeamTraceRecordDetailSuccessAction(teamTraceRecordDetail) {
	return {
		type: FETCH_TEAM_TRACE_RECORD_DETAIL_SUCCESS,
		teamTraceRecordDetail,
	};
}
export function fetchTeamTraceRecordDetailFailedAction(error, errorMessage) {
	return {
		type: FETCH_TEAM_TRACE_RECORD_DETAIL_FAILED,
		error,
		errorMessage,
	};
}

export function fetchTeamTraceRecordDetailBettingsAction(memberId, traceId, query) {
	return {
		type: START_FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS,
		memberId,
		traceId,
		query,
	};
}
export function fetchTeamTraceRecordDetailBettingsSuccessAction(teamTraceRecordDetailBettings) {
	return {
		type: FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS_SUCCESS,
		teamTraceRecordDetailBettings,
	};
}
export function fetchTeamTraceRecordDetailBettingsFailedAction(error, errorMessage) {
	return {
		type: FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS_FAILED,
		error,
		errorMessage,
	};
}

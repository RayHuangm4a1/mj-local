import { ofType, } from 'redux-observable';
import {
	map,
	switchMap,
	catchError,
} from 'rxjs/operators';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import {
	actionTypes,
	teamTraceRecordsActions,
} from '../../../../controller';
import { objectFilter, objectFilterOptionEnums } from '../../../../../lib/object-utils';
const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_EMPTY_STRING];

const {
	START_FETCH_TEAM_TRACE_RECORDS,
	START_FETCH_TEAM_TRACE_RECORD_DETAIL,
	START_FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS,
} = actionTypes;
const {
	fetchTeamTraceRecordsSuccessAction,
	fetchTeamTraceRecordsFailedAction,
	fetchTeamTraceRecordDetailSuccessAction,
	fetchTeamTraceRecordDetailFailedAction,
	fetchTeamTraceRecordDetailBettingsSuccessAction,
	fetchTeamTraceRecordDetailBettingsFailedAction,
} = teamTraceRecordsActions;


export function fetchTeamTraceRecordsEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_TEAM_TRACE_RECORDS),
		switchMap((action = {}) => rxjsApiFetcher
			.get(
				'teams/leaderId=me/traces',
				{ queries: objectFilter(action.queries, options), }
			).pipe(
				map(payload => payload.response),
				map(teamTraceRecords => fetchTeamTraceRecordsSuccessAction(teamTraceRecords)),
				catchError(error => catchErrorMessageForEpics(error, fetchTeamTraceRecordsFailedAction)),
			)
		),
	);
}

// TODO check API
export function fetchTeamTraceRecordDetailEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_TEAM_TRACE_RECORD_DETAIL),
		switchMap(({ memberId, traceId }) => {
			return rxjsApiFetcher
				.get(`teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}`)
				.pipe(
					map(payload => payload.response),
					map(response => fetchTeamTraceRecordDetailSuccessAction(response)),
					catchError(error => catchErrorMessageForEpics(error, fetchTeamTraceRecordDetailFailedAction)),
				);
		}),
	);
}

// TODO check API
export function fetchTeamTraceRecordDetailBettingsEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS),
		switchMap(({ memberId, traceId, query }) => {
			return rxjsApiFetcher
				.get(`teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}/bettings`, { queries: objectFilter(query, options) })
				.pipe(
					map(payload => payload.response),
					map(response => fetchTeamTraceRecordDetailBettingsSuccessAction(response)),
					catchError(error => catchErrorMessageForEpics(error, fetchTeamTraceRecordDetailBettingsFailedAction)),
				);
		}),
	);
}

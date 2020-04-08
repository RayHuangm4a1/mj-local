import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	actionTypes,
	traceRecordActions,
} from '../../../controller';
import { objectFilter, objectFilterOptionEnums, } from '../../../../lib/object-utils';
import { rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_FETCH_TRACE_RECORDS,
	START_FETCH_TRACE_RECORD,
	START_FETCH_LATEST_TRACE_RECORDS,
} = actionTypes;
const {
	fetchTraceRecordsSuccessAction,
	fetchTraceRecordsFailedAction,
	fetchTraceRecordSuccessAction,
	fetchTraceRecordFailedAction,
	fetchLatestTraceRecordsSuccessAction,
	fetchLatestTraceRecordsFailedAction,
} = traceRecordActions;
const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

export function fetchTraceRecordsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_TRACE_RECORDS),
		switchMap((action) => rxjsApiFetcher
			.get(`/traces`, { queries: objectFilter(action.queries, options), })
			.pipe(
				map(payload => {
					const { query = {} } = action;
					const { page } = query;
					const response = { ...payload.response, ...{ page }, };

					return fetchTraceRecordsSuccessAction(response);
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchTraceRecordsFailedAction)),
			)
		),
	);
}

export function fetchTraceRecordEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_TRACE_RECORD),
		switchMap((action) => rxjsApiFetcher
			.get(`/traces/id=${action.traceId}`)
			.pipe(
				map(payload => fetchTraceRecordSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchTraceRecordFailedAction)),
			)
		),
	);
}

export function fetchLatestTraceRecordsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LATEST_TRACE_RECORDS),
		switchMap((action) => rxjsApiFetcher.get('/traces')
			.pipe(
				map(payload => {
					const { query = {} } = action;
					const { page } = query;
					const response = { ...payload.response, ...{ page }, };

					return fetchLatestTraceRecordsSuccessAction(response);
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchLatestTraceRecordsFailedAction)),
			)
		),
	);
}

import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	mergeMap,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	actionTypes,
	traceRecordBettingActions,
	walletsActions,
} from '../../../controller';
import { objectFilter, objectFilterOptionEnums, } from '../../../../lib/object-utils';
import { rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_FETCH_TRACE_RECORD_BETTINGS,
	START_DISCARD_TRACE_RECORD_BETTINGS,
} = actionTypes;
const {
	fetchTraceRecordBettingsSuccessAction,
	fetchTraceRecordBettingsFailedAction,
	discardTraceRecordBettingsSuccessAction,
	discardTraceRecordBettingsFailedAction,
} = traceRecordBettingActions;
const {
	updateWallet,
} = walletsActions;

const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

export function fetchTraceRecordBettingsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_TRACE_RECORD_BETTINGS),
		switchMap((action) => rxjsApiFetcher
			.get(`/traces/id=${action.traceId}/bettings`, { queries: objectFilter(action.queries, options), })
			.pipe(
				map(payload => {
					const { query = {} } = action;
					const { page } = query;
					const response = { ...payload.response, ...{ page }, };

					return fetchTraceRecordBettingsSuccessAction(response);
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchTraceRecordBettingsFailedAction)),
			)
		),
	);
}

export function discardTraceRecordBettingEpic(action$, state$) {
	return action$.pipe(
		ofType(START_DISCARD_TRACE_RECORD_BETTINGS),
		switchMap(action => rxjsApiFetcher
			.delete(`/traces/id=${action.traceId}/bettings`, action.selectedBettingIds)
			.pipe(
				map(payload => payload.response),
				mergeMap(response => {
					return [
						discardTraceRecordBettingsSuccessAction(response.results),
						updateWallet(response.wallet),
					];
				}),
				catchError(error => catchErrorMessageForEpics(error, discardTraceRecordBettingsFailedAction)),
			)
		),
	);
}

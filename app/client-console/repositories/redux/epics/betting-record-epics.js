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
	bettingRecordActions,
	walletsActions,
} from '../../../controller';
import { objectFilter, objectFilterOptionEnums, } from '../../../../lib/object-utils';
import { rxjsApiFetcher, } from '../../../lib/general-utils';
import { getQueryString, } from 'ljit-lib/qs-utils';

const {
	START_FETCH_BETTING_RECORDS,
	START_DISCARD_BETTING_RECORD,
	START_FETCH_LATEST_BETTING_RECORDS,
} = actionTypes;
const {
	fetchBettingRecordsSuccessAction,
	fetchBettingRecordsFailedAction,
	discardBettingRecordSuccessAction,
	discardBettingRecordFailedAction,
	fetchLatestBettingRecordsSuccessAction,
	fetchLatestBettingRecordsFailedAction,
} = bettingRecordActions;
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

export function fetchBettingRecordsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_BETTING_RECORDS),
		switchMap((action) => rxjsApiFetcher
			.get(`/bettings?${getQueryString(objectFilter(action.query, options))}`)
			.pipe(
				map(payload => {
					const { query = {} } = action;
					const { page } = query;
					const response = { ...payload.response, ...{ page }, };

					return fetchBettingRecordsSuccessAction(response);
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchBettingRecordsFailedAction)),
			)
		),
	);
}

export function discardBettingRecordEpic(action$, state$) {
	return action$.pipe(
		ofType(START_DISCARD_BETTING_RECORD),
		switchMap(action => rxjsApiFetcher
			.delete(`/bettings/id=${action.id}`)
			.pipe(
				map(payload => payload.response),
				mergeMap(response => {
					return [
						discardBettingRecordSuccessAction(response.result),
						updateWallet(response.wallet),
					];
				}),
				catchError(error => catchErrorMessageForEpics(error, discardBettingRecordFailedAction)),
			)
		),
	);
}

export function fetchLatestBettingRecordsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LATEST_BETTING_RECORDS),
		switchMap((action) => rxjsApiFetcher.get('/bettings')
			.pipe(
				map(payload => {
					const { query = {} } = action;
					const { page } = query;
					const response = { ...payload.response, ...{ page }, };

					return fetchLatestBettingRecordsSuccessAction(response);
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchLatestBettingRecordsFailedAction)),
			)
		),
	);
}

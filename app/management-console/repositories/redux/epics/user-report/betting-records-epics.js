import { ofType, } from 'redux-observable';
import {
	switchMap,
	map,
	catchError
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	bettingRecordsActions,
} from '../../../../controller';
import { objectFilter, objectFilterOptionEnums } from '../../../../../lib/object-utils';
import { getQueryString } from 'ljit-lib/qs-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	START_FETCH_BETTING_RECORDS,
} = actionTypes;

const {
	fetchBettingRecordsSuccessAction,
	fetchBettingRecordsFailedAction
} = bettingRecordsActions;

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
		switchMap(action => rxjsApiFetcher
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

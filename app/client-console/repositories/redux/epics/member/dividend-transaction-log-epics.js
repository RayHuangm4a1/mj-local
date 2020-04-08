import { debounceTime, } from 'rxjs/operators';
import { ofType, } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import { objectFilter, objectFilterOptionEnums, } from '../../../../../lib/object-utils';
import {
	actionTypes,
	dividendTransactionLogActions,
} from '../../../../controller';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	START_FETCH_DIVIDEND_TRANSACTION_LOGS,
} = actionTypes;
const {
	fetchDividendTransactionLogsSuccessAction,
	fetchDividendTransactionLogsFailedAction,
} = dividendTransactionLogActions;
const {
	SKIP_EMPTY_STRING,
	SKIP_UNDEFINED,
	SKIP_NULL,
} = objectFilterOptionEnums;
const options = [ SKIP_EMPTY_STRING, SKIP_UNDEFINED, SKIP_NULL, ];

const MIN_DEBOUNCE_TIME = 300;
const ENABLE_DIVIDEND = 1;

export function fetchDividendTransactionLogsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_DIVIDEND_TRANSACTION_LOGS),
		debounceTime(MIN_DEBOUNCE_TIME),
		switchMap((action) => {
			const {
				queries: {
					limit,
					page,
					...restQueries
				},
			} = action;
			const defaultPage = state$.value.dividendTransactionLogs.getIn([ 'data', 'page', ]);
			const defaultPageLimit = state$.value.dividendTransactionLogs.get('limit');
			const nextPage = page || defaultPage;

			return rxjsApiFetcher
				.get('/transaction-logs', {
					queries: {
						...objectFilter(restQueries, options),
						dividend: ENABLE_DIVIDEND,
						page: nextPage,
						limit: limit || defaultPageLimit,
					},
				})
				.pipe(
					map((payload) => {
						const response = {
							...payload.response,
							page: nextPage,
						};

						return fetchDividendTransactionLogsSuccessAction(response);
					}),
					catchError(error => catchErrorMessageForEpics(error, fetchDividendTransactionLogsFailedAction)),
				);
		})
	);
}

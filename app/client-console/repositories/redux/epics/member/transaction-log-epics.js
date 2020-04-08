import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	transactionLogActions,
} from '../../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import { getAPIBaseUrl, } from '../../../../lib/general-utils';
import { objectFilter, objectFilterOptionEnums } from '../../../../../lib/object-utils';
import { getQueryString } from 'ljit-lib/qs-utils';

const {
	START_FETCH_TRANSACTION_LOGS,
} = actionTypes;
const {
	fetchTransactionLogsSuccessAction,
	fetchTransactionLogsFailedAction
} = transactionLogActions;
const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];
//TODO: set apiBaseUrl to product config
const apiBaseUrl = getAPIBaseUrl();

export function fetchTransactionLogsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_TRANSACTION_LOGS),
		switchMap(action => {
			const query = {
				...action.query,
				dividend: 0
			};

			return ajax({
				url: `${apiBaseUrl}/transaction-logs?${param(query)}`,
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}).pipe(
				map(payload => {
					const { query = {} } = action;
					const { page } = query;
					const response = { ...payload.response, ...{ page }, };

					return fetchTransactionLogsSuccessAction(response);
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchTransactionLogsFailedAction)),
			);
		}),
	);
}

function param(query) {
	return getQueryString(objectFilter(query, options));
}

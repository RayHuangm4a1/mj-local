import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';

import {
	actionTypes,
	lotteryActions,
} from '../../../controller';

import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';

import { getAPIBaseUrl, } from '../../../lib/general-utils';

const {
	START_FETCH_LOTTERIES,
} = actionTypes;
const {
	fetchLotteriesSuccessAction,
	fetchLotteriesFailedAction,
} = lotteryActions;

//TODO: set apiBaseUrl to product config
//TODO: set fetchLotteriesAPI to initialEpic
const apiBaseUrl = getAPIBaseUrl();

export function fetchLotteriesEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERIES),
		switchMap(() =>
			ajax({
				url: `${apiBaseUrl}/lotteries`,
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}).pipe(
				map(payload => fetchLotteriesSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchLotteriesFailedAction)),
			)
		),
	);
}

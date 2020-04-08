import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';

import {
	actionTypes,
	lotteryClassActions,
} from '../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import { getAPIBaseUrl, } from '../../../lib/general-utils';

const {
	START_FETCH_LOTTERY_CLASSES,
} = actionTypes;
const {
	fetchLotteryClassesSuccessAction,
	fetchLotteryClassesFailedAction,
} = lotteryClassActions;

//TODO: set apiBaseUrl to product config
//TODO: set fetchLotteryClassesAPI to initialEpic
const apiBaseUrl = getAPIBaseUrl();

export function fetchLotteryClassesEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERY_CLASSES),
		switchMap(() =>
			ajax({
				url: `${apiBaseUrl}/lottery-classes`,
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}).pipe(
				map(payload => fetchLotteryClassesSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchLotteryClassesFailedAction)),
			)
		),
	);
}

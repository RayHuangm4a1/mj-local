import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';

import {
	actionTypes,
	playConditionActions,
} from '../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import { getAPIBaseUrl, } from '../../../lib/general-utils';

const {
	START_FETCH_PLAY_CONDITIONS,
} = actionTypes;
const {
	fetchPlayConditionsSuccessAction,
	fetchPlayConditionsFailedAction,
} = playConditionActions;
const apiBaseUrl = getAPIBaseUrl();

export function fetchPlayConditionsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_PLAY_CONDITIONS),
		switchMap(action =>
			ajax({
				url:`${apiBaseUrl}/lotteries/id=${action.lotteryId}/play-conditions` ,
				methods: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}).pipe(
				map(payload => fetchPlayConditionsSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error,fetchPlayConditionsFailedAction)),
			),
		),
	);
}

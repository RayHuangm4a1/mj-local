import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
	map,
	catchError,
	switchMap
} from 'rxjs/operators';
import {
	actionTypes,
	platformActions,
} from '../../../controller';
import { getAPIBaseUrl, } from '../../../lib/general-utils';

import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';

const {
	START_FETCH_PLATFORM,
} = actionTypes;
const {
	fetchPlatformSuccessAction,
	fetchPlatformFailedAction,
} = platformActions;

const apiBaseUrl = getAPIBaseUrl();

export function fetchPlatformEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_PLATFORM),
		switchMap (() =>
			ajax({
				url:`${apiBaseUrl}/platform` ,
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}).pipe(
				map(payload => fetchPlatformSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchPlatformFailedAction)),
			),
		)
	);
}

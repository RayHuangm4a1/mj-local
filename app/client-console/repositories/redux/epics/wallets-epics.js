import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
	map,
	catchError,
	switchMap,
} from 'rxjs/operators';
import {
	actionTypes,
	walletsActions,
} from '../../../controller';
import { getAPIBaseUrl, } from '../../../lib/general-utils';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';

const {
	START_FETCH_WALLETS,
} = actionTypes;
const {
	fetchWalletsSuccessAction,
	fetchWalletsFailedAction,
} = walletsActions;

const apiBaseUrl = getAPIBaseUrl();

export function fetchWalletsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_WALLETS),
		switchMap(() =>
			ajax({
				url: `${apiBaseUrl}/wallets`,
				method: 'GET',
				headers: {
					'Accept': 'application/json',
				},
			}).pipe(
				map(payload => fetchWalletsSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchWalletsFailedAction)),
			)
		)
	);
}

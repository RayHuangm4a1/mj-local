import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	userWalletsActions,
} from '../../../../controller';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	START_FETCH_USER_WALLETS,
} = actionTypes;
const {
	fetchUserWalletsSuccessAction,
	fetchUserWalletsFailedAction,
} = userWalletsActions;

export function fetchUserWalletsEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_USER_WALLETS),
		switchMap(({ userId, }) => (
			rxjsApiFetcher.get(`/users/id=${userId}/wallets`)
				.pipe(
					map(payload => payload.response),
					map(response => fetchUserWalletsSuccessAction(response)),
					catchError(error => catchErrorMessageForEpics(error, fetchUserWalletsFailedAction))
				)
		)),
	);
}


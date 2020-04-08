import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import {
	actionTypes,
	userFinanceLevelActions,
} from '../../../../controller';

const {
	START_FETCH_USER_FINANCE_LEVEL,
	START_UPDATE_USER_FINANCE_LEVEL,
} = actionTypes;
const {
	fetchUserFinanceLevelSuccessAction,
	fetchUserFinanceLevelFailedAction,
	updateUserFinanceLevelSuccessAction,
	updateUserFinanceLevelFailedAction,
} = userFinanceLevelActions;

export function fetchUserFinanceLevelEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_USER_FINANCE_LEVEL),
		switchMap(({ username, }) =>
			rxjsApiFetcher
				.get(`users/name=${username}/stats`)
				.pipe(
					map(payload => fetchUserFinanceLevelSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, fetchUserFinanceLevelFailedAction))
				)
		)
	);
}

export function updateUserFinanceLevelEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_FINANCE_LEVEL),
		switchMap(({
			userId,
			levelId,
			levelExpiredAt,
		}) =>
			rxjsApiFetcher
				.put(`users/id=${userId}/levels/id=${levelId}`, { levelExpiredAt, })
				.pipe(
					map(() => updateUserFinanceLevelSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, updateUserFinanceLevelFailedAction))
				)
		)
	);
}

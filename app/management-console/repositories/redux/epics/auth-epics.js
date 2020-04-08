import { ofType, } from 'redux-observable';
import { ajax, } from 'rxjs/ajax';
import {
	switchMap,
	map,
	mergeMap,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	actionTypes,
	authActions,
	meActions,
} from '../../../controller';
import { getAPIBaseUrl, rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_LOGIN,
	START_LOGOUT,
	START_CHECK_AUTH,
} = actionTypes;
const {
	loginSuccessAction,
	loginFailedAction,
	logoutSuccessAction,
	logoutFailedAction,
	checkAuthSuccessAction,
	checkAuthFailedAction,
} = authActions;
const {
	fetchMeSuccessAction,
} = meActions;

const API_BASE_URL = getAPIBaseUrl();

export function loginEpic(action$, state$) {
	return action$.pipe(
		ofType(START_LOGIN),
		switchMap(action =>
			ajax({
				url: `${API_BASE_URL}/login`,
				method: 'POST',
				header: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: {
					username: action.username,
					password: action.password,
				},
			}).pipe(
				map(payload => payload.response),
				mergeMap(user => [
					loginSuccessAction(),
					fetchMeSuccessAction(user),
					checkAuthSuccessAction(),
				]),
				catchError(error => catchErrorMessageForEpics(error, loginFailedAction)),
			)
		),
	);
}

export function logoutEpic(action$, state$) {
	return action$.pipe(
		ofType(START_LOGOUT),
		switchMap(() =>
			ajax({
				url: `${API_BASE_URL}/logout`,
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			}).pipe(
				map(() => logoutSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, logoutFailedAction)),
			)
		)
	);
}

export function checkAuthEpic(action$, state$) {
	return action$.pipe(
		ofType(START_CHECK_AUTH),
		switchMap(() => rxjsApiFetcher
			.get('staffs/id=me')
			.pipe(
				map(payload => payload.response),
				mergeMap(payload => {
					return [
						checkAuthSuccessAction(),
						fetchMeSuccessAction(payload),
					];
				}),
				catchError(error => catchErrorMessageForEpics(error, checkAuthFailedAction)),
			)
		)
	);
}

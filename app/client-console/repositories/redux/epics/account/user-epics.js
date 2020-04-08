import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
	switchMap,
	mergeMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	getUserData,
} from '../../../../lib/user-utils';
import {
	actionTypes,
	userActions,
	walletsActions,
} from '../../../../controller';
import { getAPIBaseUrl, } from '../../../../lib/general-utils';
import { getQueryString } from "ljit-lib/qs-utils";
import { objectFilter, objectFilterOptionEnums } from '../../../../../lib/object-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];
const {
	START_FETCH_USER,
	START_CREATE_CHILDREN_USER,
	START_UPDATE_USER_NICKNAME,
	START_UPDATE_USER_GREETING,
	START_FETCH_CHILDREN_USERS,
	START_TRANSFER_TO_USER,
	START_UPDATE_CHILDREN_USER,
} = actionTypes;
const {
	fetchUserSuccessAction,
	fetchUserFailedAction,
	createChildrenUserSuccessAction,
	createChildrenUserFailedAction,
	updateUserNicknameSuccessAction,
	updateUserNicknameFailedAction,
	updateUserGreetingSuccessAction,
	updateUserGreetingFailedAction,
	fetchChildrenUsersSuccessAction,
	fetchChildrenUsersFailedAction,
	transferToUserSuccessAction,
	transferToUserFailedAction,
	updateChildrenUserSuccessAction,
	updateChildrenUserFailedAction,
} = userActions;
const {
	updateWallet,
} = walletsActions;

const API_BASE_URL = getAPIBaseUrl();

export function fetchUserEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_USER),
		switchMap(() =>
			ajax({
				url: `${API_BASE_URL}/users/id=me`,
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}).pipe(
				map((payload) => {
					const platformData = state$.value.platform.get('data').toObject();
					const userData = getUserData(platformData, payload.response);

					return fetchUserSuccessAction(userData);
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchUserFailedAction)),
			)
		),
	);
}

export function startCreateChildrenUserEpic(action$, state$) {
	return action$.pipe(
		ofType(START_CREATE_CHILDREN_USER),
		switchMap((action) =>
			ajax({
				url: `${API_BASE_URL}/teams/leaderId=me/children`,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: action.data,
			}).pipe(
				map(payload => createChildrenUserSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, createChildrenUserFailedAction)),
			)
		),
	);
}

export function startUpdateUserNicknameEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_NICKNAME),
		switchMap((action) =>
			ajax({
				url: `${API_BASE_URL}/users/id=me/nickname`,
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: {
					password: action.password,
					nickname: action.nickname,
				}
			}).pipe(
				map(() => updateUserNicknameSuccessAction(action.nickname)),
				catchError(error => catchErrorMessageForEpics(error, updateUserNicknameFailedAction)),
			)
		),
	);
}

export function startUpdateUserGreetingEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_GREETING),
		switchMap((action) =>
			ajax({
				url: `${API_BASE_URL}/users/id=me/greeting`,
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: {
					password: action.password,
					greeting: action.greeting,
				}
			}).pipe(
				map(() => updateUserGreetingSuccessAction(action.greeting)),
				catchError(error => catchErrorMessageForEpics(error, updateUserGreetingFailedAction)),
			)
		),
	);
}

export function fetchChildrenUsersEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_CHILDREN_USERS),
		switchMap((action) => {
			const { userIdOrUsername, query } = action;
			const queries = getQueryString(objectFilter(query, options));

			return ajax({
				url: `${API_BASE_URL}/teams/leaderKey=${userIdOrUsername}/children?${queries}`,
				method: 'GET',
				headers: {
					Accept: 'application/json',
				}
			}).pipe(
				map(payload => {
					const platformData = state$.value.platform.get('data').toObject();
					const childrenUsers = payload.response.data.children.map(user => {
						const bonus = getUserData(platformData, user).bonus;

						user.bonus = bonus;
						return user;
					});
					const { numOfItems, numOfPages, data } = payload.response;
					const { ancestors } = data;
					const { page } = query;

					return fetchChildrenUsersSuccessAction({ numOfItems, numOfPages, ancestors, childrenUsers, page });
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchChildrenUsersFailedAction)),
			);
		}),
	);
}

export function transferToUserEpic(action$, state$) {
	return action$.pipe(
		ofType(START_TRANSFER_TO_USER),
		switchMap(({ username, bankCardNumber, amount, password, totp, }) => rxjsApiFetcher
			.post('wallets/id=primary/transferred', {
				username,
				bankCardNumber,
				amount,
				password,
				totp,
			}).pipe(
				map(payload => payload.response),
				mergeMap(wallet => [
					transferToUserSuccessAction(),
					updateWallet(wallet),
				]),
				catchError(error => catchErrorMessageForEpics(error, transferToUserFailedAction)),
			)
		)
	);
}

export function updateChildrenUserEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_CHILDREN_USER),
		switchMap(({ childrenId, isAgent, bonus, }) => 
			rxjsApiFetcher
				.patch(`teams/leaderId=me/children/id=${childrenId}`, {
					agent: isAgent,
					bonus,
				})
				.pipe(
					map(() => updateChildrenUserSuccessAction(childrenId, isAgent, bonus)),
					catchError(error => catchErrorMessageForEpics(error, updateChildrenUserFailedAction)),
				)
		)
	);
}

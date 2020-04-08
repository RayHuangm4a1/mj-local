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
	userAccountActions,
} from '../../../../controller';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	START_FETCH_USER_ACCOUNT,
	START_UPDATE_USER_LOGIN_PASSWORD,
	START_UPDATE_USER_BETTING_PASSWORD,
	START_UPDATE_USER_FUNDS_PASSWORD,
	START_DELETE_USER_SECURITY_QUESTIONS,
	START_ENABLE_USER_LOGIN_GEO_VALIDATION,
	START_DISABLE_USER_LOGIN_GEO_VALIDATION,
	START_DISABLE_USER_GOOGLE_TOTP,
} = actionTypes;
const {
	fetchUserAccountSuccessAction,
	fetchUserAccountFailedAction,
	updateUserLoginPasswordSuccessAction,
	updateUserLoginPasswordFailedAction,
	updateUserBettingPasswordSuccessAction,
	updateUserBettingPasswordFailedAction,
	updateUserFundsPasswordSuccessAction,
	updateUserFundsPasswordFailedAction,
	deleteUserSecurityQuestionsSuccessAction,
	deleteUserSecurityQuestionsFailedAction,
	enableUserLoginGeoValidationSuccessAction,
	enableUserLoginGeoValidationFailedAction,
	disableUserLoginGeoValidationSuccessAction,
	disableUserLoginGeoValidationFailedAction,
	disableUserGoogleTotpSuccessAction,
	disableUserGoogleTotpFailedAction
} = userAccountActions;

export function fetchUserAccountEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_USER_ACCOUNT),
		switchMap(({ userId, }) => (
			rxjsApiFetcher
				.get(`users/id=${userId}/account`)
				.pipe(
					map(payload => payload.response),
					map(response => fetchUserAccountSuccessAction(response)),
					catchError(error => catchErrorMessageForEpics(error, fetchUserAccountFailedAction))
				)
		)),
	);
}

export function updateUserLoginPasswordEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_LOGIN_PASSWORD),
		switchMap(action => (
			rxjsApiFetcher.put(`users/id=${action.userId}/credentials/type=login`, {
				password: action.password
			}).pipe(
				map(() => updateUserLoginPasswordSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, updateUserLoginPasswordFailedAction))
			)
		)),
	);
}

export function updateUserBettingPasswordEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_BETTING_PASSWORD),
		switchMap(action => (
			rxjsApiFetcher.put(`users/id=${action.userId}/credentials/type=bet`, {
				password: action.password
			}).pipe(
				map(() => updateUserBettingPasswordSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, updateUserBettingPasswordFailedAction))
			)
		)),
	);
}

export function updateUserFundsPasswordEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_FUNDS_PASSWORD),
		switchMap(action => (
			rxjsApiFetcher.put(`users/id=${action.userId}/credentials/type=funds`, {
				password: action.password
			}).pipe(
				map(() => updateUserFundsPasswordSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, updateUserFundsPasswordFailedAction))
			)
		)),
	);
}
export function deleteUserSecurityQuestionsEpic(action$) {
	return action$.pipe(
		ofType(START_DELETE_USER_SECURITY_QUESTIONS),
		switchMap(action => (
			rxjsApiFetcher.delete(`users/id=${action.userId}/security-questions`)
				.pipe(
					map(() => deleteUserSecurityQuestionsSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, deleteUserSecurityQuestionsFailedAction))
				)
		)),
	);
}
export function enableUserLoginGeoValidationEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_USER_LOGIN_GEO_VALIDATION),
		switchMap(action => rxjsApiFetcher
			.post(`users/id=${action.userId}/login-geo-validation`)
			.pipe(
				map(() => enableUserLoginGeoValidationSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableUserLoginGeoValidationFailedAction)),
			)
		)
	);
}
export function disableUserLoginGeoValidationEpic(action$) {
	return action$.pipe(
		ofType(START_DISABLE_USER_LOGIN_GEO_VALIDATION),
		switchMap(action => rxjsApiFetcher
			.delete(`users/id=${action.userId}/login-geo-validation`)
			.pipe(
				map(() => disableUserLoginGeoValidationSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, disableUserLoginGeoValidationFailedAction)),
			)
		)
	);
}
export function disableUserGoogleTotpEpic(action$) {
	return action$.pipe(
		ofType(START_DISABLE_USER_GOOGLE_TOTP),
		switchMap(action => rxjsApiFetcher
			.delete(`users/id=${action.userId}/google-totp`)
			.pipe(
				map(() => disableUserGoogleTotpSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, disableUserGoogleTotpFailedAction)),
			)
		)
	);
}

import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
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
	userActions,
} from '../../../controller';

import {
	getAPIBaseUrl,
	rxjsApiFetcher,
} from '../../../lib/general-utils';

const {
	START_LOGIN,
	START_LOGOUT,
	START_CHECK_AUTH,

	START_LOGIN_VIA_GOOGLE_TOTP,

	START_FETCH_CAPTCHA,
	START_CHECK_CAPTCHA,

	START_GEO_VALIDATE_WITH_PAYER,
	START_UPDATE_DEFAULT_PASSWORD,
	START_FETCH_PASSWORD_RESET_METHODS,
	START_RESET_PASSWORD_VIA_SECURITY_QUESTIONS,
	START_RESET_PASSWORD_VIA_GOOGLE_TOTP,
} = actionTypes;

const {
	loginSuccessAction,
	loginFailedAction,
	loginViaGoogleTotpSuccessAction,
	loginViaGoogleTotpFailedAction,
	logoutSuccessAction,
	logoutFailedAction,
	checkAuthSuccessAction,
	checkAuthFailedAction,

	fetchCaptchaSuccessAction,
	fetchCaptchaFailedAction,
	checkCaptchaSuccessAction,
	checkCaptchaFailedAction,

	setIsGeoValidation,

	geoValidateWithPayerSuccessAction,
	geoValidateWithPayerFailedAction,
	updateDefaultPasswordSuccessAction,
	updateDefaultPasswordFailedAction,
	fetchPasswordResetMethodsSuccessAction,
	fetchPasswordResetMethodsFailedAction,
	resetPasswordViaSecurityQuestionsSuccessAction,
	resetPasswordViaSecurityQuestionsFailedAction,
	resetPasswordViaGoogleTotpSuccessAction,
	resetPasswordViaGoogleTotpFailedAction,
	setIsCaptchaValidateAction,
} = authActions;

const {
	fetchUserSuccessAction,
} = userActions;

const API_BASE_URL = getAPIBaseUrl();

const CHECK_CAPTCHA_SEE_OTHER_STATUS_CODE = 303;

export function loginEpic(action$, state$) {
	return action$.pipe(
		ofType(START_LOGIN),
		switchMap(action =>
			ajax({
				url: `${API_BASE_URL}/login`,
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: {
					username: action.username,
					password: action.password,
				},
			}).pipe(
				map(payload => payload.response),
				mergeMap(payload => [
					loginSuccessAction(),
					fetchUserSuccessAction(payload),
					checkAuthSuccessAction(),
					setIsCaptchaValidateAction(false),
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
		),
	);
}

export function loginViaGoogleTotpEpic(action$, state$) {
	return action$.pipe(
		ofType(START_LOGIN_VIA_GOOGLE_TOTP),
		switchMap(action => rxjsApiFetcher
			.post(
				`${API_BASE_URL}/login?via=google-totp`,
				{
					username: action.username,
					totp: action.totp,
				}
			)
			.pipe(
				mergeMap(payload => [
					loginViaGoogleTotpSuccessAction(),
					fetchUserSuccessAction(payload.response),
					checkAuthSuccessAction(),
				]),
				catchError(error => catchErrorMessageForEpics(error, loginViaGoogleTotpFailedAction)),
			)
		),
	);
}

export function startCheckAuthEpic(action$, state$) {
	return action$.pipe(
		ofType(START_CHECK_AUTH),
		switchMap(() =>
			ajax({
				url: `${API_BASE_URL}/users/id=me`,
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}).pipe(
				map(payload => payload.response),
				mergeMap((user) => {
					return [
						fetchUserSuccessAction(user),
						checkAuthSuccessAction(),
					];
				}),
				catchError(error => catchErrorMessageForEpics(error, checkAuthFailedAction)),
			)
		),
	);
}

export function fetchCaptchaEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_CAPTCHA),
		switchMap(() =>
			rxjsApiFetcher.post('captcha').pipe(
				map(payload => payload.response),
				map(payload => fetchCaptchaSuccessAction(payload)),
				catchError(error => catchErrorMessageForEpics(error, fetchCaptchaFailedAction)),
			),
		)
	);
}

export function checkCaptchaEpic(action$, state$) {
	return action$.pipe(
		ofType(START_CHECK_CAPTCHA),
		switchMap(action =>
			rxjsApiFetcher.get(`guests/username=${action.username}?captcha=${action.captcha}`).pipe(
				mergeMap(payload => {
					const { status, } = payload;

					if (status === CHECK_CAPTCHA_SEE_OTHER_STATUS_CODE) {
						return [
							setIsGeoValidation(true),
						];
					}

					return [
						setIsCaptchaValidateAction(true),
						checkCaptchaSuccessAction(payload.response),
					];
				}),
				catchError(error => catchErrorMessageForEpics(error, checkCaptchaFailedAction)),
			),
		)
	);
}

export function geoValidateWithPayerEpic(action$, state$) {
	return action$.pipe(
		ofType(START_GEO_VALIDATE_WITH_PAYER),
		switchMap(action => rxjsApiFetcher
			.get(`guests/id=me/payers/name=${action.payer}`).pipe(
				mergeMap(() => [
					setIsCaptchaValidateAction(true),
					geoValidateWithPayerSuccessAction(),
				]),
				catchError(error => catchErrorMessageForEpics(error, geoValidateWithPayerFailedAction)),
			),
		)
	);
}
		
export function updateDefaultPasswordEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_DEFAULT_PASSWORD),
		switchMap((action) => {
			const {
				confirmedPassword,
				newPassword,
				password,
			} = action;

			return rxjsApiFetcher.put('/guests/id=me/credentials/type=login?via=default-password', {
				confirmedPassword,
				newPassword,
				password,
			}).pipe(
				map(payload => payload.response),
				map(() => updateDefaultPasswordSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, updateDefaultPasswordFailedAction)),
			);
		})
	);
}
export function fetchPasswordResetMethodsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_PASSWORD_RESET_METHODS),
		switchMap(action =>
			rxjsApiFetcher.get(`guests/username=${action.username}/password-resetting-methods?captcha=${action.captcha}`).pipe(
				map(payload => payload.response),
				map(payload => fetchPasswordResetMethodsSuccessAction(payload)),
				catchError(error => catchErrorMessageForEpics(error, fetchPasswordResetMethodsFailedAction)),
			)
		)
	);
}

export function resetPasswordViaSecurityQuestionsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_RESET_PASSWORD_VIA_SECURITY_QUESTIONS),
		switchMap(action =>
			rxjsApiFetcher.put(`guests/id=me/credentials/type=login?via=security-question`, {
				securityQuestionAnswers: action.securityQuestionAnswers,
				newPassword: action.newPassword,
			}).pipe(
				map(payload => payload.response),
				map(payload => resetPasswordViaSecurityQuestionsSuccessAction(payload)),
				catchError(error => catchErrorMessageForEpics(error, resetPasswordViaSecurityQuestionsFailedAction)),
			)
		)
	);
}

export function resetPasswordViaGoogleTotpEpic(action$, state$) {
	return action$.pipe(
		ofType(START_RESET_PASSWORD_VIA_GOOGLE_TOTP),
		switchMap(action =>
			rxjsApiFetcher.put(`/guests/id=me/credentials/type=login?via=google-totp`, {
				totp: action.totp,
				newPassword: action.newPassword,
			}).pipe(
				map(payload => payload.response),
				map(payload => resetPasswordViaGoogleTotpSuccessAction(payload)),
				catchError(error => catchErrorMessageForEpics(error, resetPasswordViaGoogleTotpFailedAction)),
			)
		)
	);
}

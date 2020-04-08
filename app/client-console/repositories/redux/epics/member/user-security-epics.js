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
	userSecurityActions,
} from '../../../../controller';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import { objectFilter, objectFilterOptionEnums } from '../../../../../lib/object-utils';

const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

const {
	START_FETCH_USER_SECURITY,
	START_UPDATE_USER_LOGIN_PASSWORD,
	START_UPDATE_USER_BET_PASSWORD,
	START_UPDATE_USER_FUNDS_PASSWORD,
	START_ENABLE_LOGIN_GEO_VALIDATION,
	START_DISABLE_LOGIN_GEO_VALIDATION,
	START_UPDATE_USER_SECURITY_QUESTIONS,
	START_BIND_GOOGLE_AUTHENTICATION,
	START_UNBIND_GOOGLE_AUTHENTICATION,
	START_UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS,
	START_UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS,
	START_UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS,
	START_UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP,
	START_UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP,
	START_UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP,
} = actionTypes;
const {
	fetchUserSecuritySuccessAction,
	fetchUserSecurityFailedAction,
	updateUserLoginPasswordSuccessAction,
	updateUserLoginPasswordFailedAction,
	updateUserBetPasswordSuccessAction,
	updateUserBetPasswordFailedAction,
	updateUserFundsPasswordSuccessAction,
	updateUserFundsPasswordFailedAction,
	enableLoginGeoValidationSuccessAction,
	enableLoginGeoValidationFailedAction,
	disableLoginGeoValidationSuccessAction,
	disableLoginGeoValidationFailedAction,
	updateUserSecurityQuestionsSuccessAction,
	updateUserSecurityQuestionsFailedAction,
	bindGoogleAuthenticationSuccessAction,
	bindGoogleAuthenticationFailedAction,
	unbindGoogleAuthenticationSuccessAction,
	unbindGoogleAuthenticationFailedAction,
	updateUserLoginPasswordViaSecurityQuestionsSuccessAction,
	updateUserLoginPasswordViaSecurityQuestionsFailedAction,
	updateUserBetPasswordViaSecurityQuestionsSuccessAction,
	updateUserBetPasswordViaSecurityQuestionsFailedAction,
	updateUserFundsPasswordViaSecurityQuestionsSuccessAction,
	updateUserFundsPasswordViaSecurityQuestionsFailedAction,
	updateUserLoginPasswordViaGoogleTotpSuccessAction,
	updateUserLoginPasswordViaGoogleTotpFailedAction,
	updateUserBetPasswordViaGoogleTotpSuccessAction,
	updateUserBetPasswordViaGoogleTotpFailedAction,
	updateUserFundsPasswordViaGoogleTotpSuccessAction,
	updateUserFundsPasswordViaGoogleTotpFailedAction,
} = userSecurityActions;

export function fetchUserSecurityEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_USER_SECURITY),
		switchMap(() =>
			rxjsApiFetcher.get('/users/id=me/account').pipe(
				map((payload) => {
					return fetchUserSecuritySuccessAction(payload.response);
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchUserSecurityFailedAction)),
			)
		),
	);
}

export function updateUserLoginPasswordEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_LOGIN_PASSWORD),
		switchMap((action) =>
			rxjsApiFetcher.put('/users/id=me/credentials/type=login?via=password', objectFilter({
				password: action.password,
				newPassword: action.newPassword,
				confirmedPassword: action.confirmedPassword,
			},options)
			).pipe(
				map(() => updateUserLoginPasswordSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, updateUserLoginPasswordFailedAction)),
			)
		),
	);
}

export function updateUserBetPasswordEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_BET_PASSWORD),
		switchMap((action) =>
			rxjsApiFetcher.put('/users/id=me/credentials/type=bet?via=password', objectFilter({
				password: action.password,
				newPassword: action.newPassword,
				confirmedPassword: action.confirmedPassword,
			},options)
			).pipe(
				map(() => updateUserBetPasswordSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, updateUserBetPasswordFailedAction)),
			)
		),
	);
}

export function updateUserFundsPasswordEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_FUNDS_PASSWORD),
		switchMap((action) =>
			rxjsApiFetcher.put('/users/id=me/credentials/type=funds?via=password', objectFilter({
				password: action.password,
				newPassword: action.newPassword,
				confirmedPassword: action.confirmedPassword,
			},options)
			).pipe(
				map(() => updateUserFundsPasswordSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, updateUserFundsPasswordFailedAction)),
			)
		),
	);
}

export function enableUserLoginGeoValidationEpic(action$, state$) {
	return action$.pipe(
		ofType(START_ENABLE_LOGIN_GEO_VALIDATION),
		switchMap(() => rxjsApiFetcher
			.post('/users/id=me/login-geo-validation')
			.pipe(
				map(() => enableLoginGeoValidationSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, enableLoginGeoValidationFailedAction)),
			)
		),
	);
}

export function disableUserLoginGeoValidationEpic(action$, state$) {
	return action$.pipe(
		ofType(START_DISABLE_LOGIN_GEO_VALIDATION),
		switchMap((action) => rxjsApiFetcher
			.delete(
				'/users/id=me/login-geo-validation',
				{ payer: action.payer, }
			)
			.pipe(
				map(() => disableLoginGeoValidationSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, disableLoginGeoValidationFailedAction)),
			)
		),
	);
}
export function updateUserSecurityQuestionsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_SECURITY_QUESTIONS),
		switchMap((action) =>
			rxjsApiFetcher.post('/users/id=me/security-questions', {
				password: action.password,
				data: action.data,
			}).pipe(
				map((payload) => updateUserSecurityQuestionsSuccessAction(payload.response)),
				catchError((error) => catchErrorMessageForEpics(error, updateUserSecurityQuestionsFailedAction)),
			)
		),
	);
}

export function bindGoogleAuthenticationEpic(action$) {
	return action$.pipe(
		ofType(START_BIND_GOOGLE_AUTHENTICATION),
		switchMap((action) => (
			rxjsApiFetcher.post('/users/id=me/google-totp', {
				secret: action.secret,
				password: action.password,
				totp: action.totp,
			}).pipe(
				map(() => bindGoogleAuthenticationSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, bindGoogleAuthenticationFailedAction)),
			)
		))
	);
}

export function unbindGoogleAuthenticationEpic(action$) {
	return action$.pipe(
		ofType(START_UNBIND_GOOGLE_AUTHENTICATION),
		switchMap((action) => (
			rxjsApiFetcher.delete('/users/id=me/google-totp', {
				totp: action.totp,
			}).pipe(
				map(() => unbindGoogleAuthenticationSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, unbindGoogleAuthenticationFailedAction)),
			)
		))
	);
}

export function updateUserLoginPasswordViaSecurityQuestionsEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS),
		switchMap(({ newPassword, confirmedPassword, securityQuestionAnswers, }) => rxjsApiFetcher
			.put('/users/id=me/credentials/type=login?via=security-question', {
				newPassword,
				confirmedPassword,
				securityQuestionAnswers,
			}).pipe(
				map(() => updateUserLoginPasswordViaSecurityQuestionsSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, updateUserLoginPasswordViaSecurityQuestionsFailedAction)),
			)
		)
	);
}
export function updateUserBetPasswordViaSecurityQuestionsEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS),
		switchMap(({ newPassword, confirmedPassword, securityQuestionAnswers, }) => rxjsApiFetcher
			.put('/users/id=me/credentials/type=bet?via=security-question', {
				newPassword,
				confirmedPassword,
				securityQuestionAnswers,
			}).pipe(
				map(() => updateUserBetPasswordViaSecurityQuestionsSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, updateUserBetPasswordViaSecurityQuestionsFailedAction)),
			)
		)
	);
}
export function updateUserFundsPasswordViaSecurityQuestionsEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS),
		switchMap(({ newPassword, confirmedPassword, securityQuestionAnswers, }) => rxjsApiFetcher
			.put('/users/id=me/credentials/type=funds?via=security-question', {
				newPassword,
				confirmedPassword,
				securityQuestionAnswers,
			}).pipe(
				map(() => updateUserFundsPasswordViaSecurityQuestionsSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, updateUserFundsPasswordViaSecurityQuestionsFailedAction)),
			)
		)
	);
}
export function updateUserLoginPasswordViaGoogleTotpEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP),
		switchMap(({ newPassword, confirmedPassword, totp, }) => rxjsApiFetcher
			.put('/users/id=me/credentials/type=login?via=google-totp', {
				confirmedPassword,
				totp,
				newPassword
			}).pipe(
				map(() => updateUserLoginPasswordViaGoogleTotpSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, updateUserLoginPasswordViaGoogleTotpFailedAction)),
			)
		)
	);
}
export function updateUserBetPasswordViaGoogleTotpEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP),
		switchMap(({ newPassword, confirmedPassword, totp, }) => rxjsApiFetcher
			.put('/users/id=me/credentials/type=bet?via=google-totp', {
				confirmedPassword,
				totp,
				newPassword
			}).pipe(
				map(() => updateUserBetPasswordViaGoogleTotpSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, updateUserBetPasswordViaGoogleTotpFailedAction)),
			)
		)
	);
}
export function updateUserFundsPasswordViaGoogleTotpEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP),
		switchMap(({ newPassword, confirmedPassword, totp, }) => rxjsApiFetcher
			.put('/users/id=me/credentials/type=funds?via=google-totp', {
				confirmedPassword,
				totp,
				newPassword
			}).pipe(
				map(() => updateUserFundsPasswordViaGoogleTotpSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, updateUserFundsPasswordViaGoogleTotpFailedAction)),
			)
		)
	);
}

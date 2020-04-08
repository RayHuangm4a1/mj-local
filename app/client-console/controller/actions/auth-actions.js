import {
	START_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,

	START_LOGOUT,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,

	START_LOGIN_VIA_GOOGLE_TOTP,
	LOGIN_VIA_GOOGLE_TOTP_SUCCESS,
	LOGIN_VIA_GOOGLE_TOTP_FAILED,

	START_CHECK_AUTH,
	CHECK_AUTH_SUCCESS,
	CHECK_AUTH_FAILED,

	START_FETCH_CAPTCHA,
	FETCH_CAPTCHA_SUCCESS,
	FETCH_CAPTCHA_FAILED,

	START_CHECK_CAPTCHA,
	CHECK_CAPTCHA_SUCCESS,
	CHECK_CAPTCHA_FAILED,

	SET_IS_GEO_VALIDATION,
	SET_IS_CAPTCHA_VALIDATE,

	START_GEO_VALIDATE_WITH_PAYER,
	GEO_VALIDATE_WITH_PAYER_SUCCESS,
	GEO_VALIDATE_WITH_PAYER_FAILED,

	START_UPDATE_DEFAULT_PASSWORD,
	UPDATE_DEFAULT_PASSWORD_SUCCESS,
	UPDATE_DEFAULT_PASSWORD_FAILED,

	START_FETCH_PASSWORD_RESET_METHODS,
	FETCH_PASSWORD_RESET_METHODS_SUCCESS,
	FETCH_PASSWORD_RESET_METHODS_FAILED,

	START_RESET_PASSWORD_VIA_SECURITY_QUESTIONS,
	RESET_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	RESET_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,

	START_RESET_PASSWORD_VIA_GOOGLE_TOTP,
	RESET_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	RESET_PASSWORD_VIA_GOOGLE_TOTP_FAILED,
} from './action-types';

export function loginAction(username, password) {
	return {
		type: START_LOGIN,
		username,
		password,
	};
}

export function loginSuccessAction() {
	return {
		type: LOGIN_SUCCESS,
	};
}

export function loginFailedAction(error, errorMessage) {
	return {
		type: LOGIN_FAILED,
		error,
		errorMessage,
	};
}

export function loginViaGoogleTotpAction(username, totp) {
	return {
		type: START_LOGIN_VIA_GOOGLE_TOTP,
		username,
		totp,
	};
}

export function loginViaGoogleTotpSuccessAction() {
	return {
		type: LOGIN_VIA_GOOGLE_TOTP_SUCCESS,
	};
}

export function loginViaGoogleTotpFailedAction(error, errorMessage) {
	return {
		type: LOGIN_VIA_GOOGLE_TOTP_FAILED,
		error,
		errorMessage,
	};
}

export function logoutAction() {
	return {
		type: START_LOGOUT,
	};
}

export function logoutSuccessAction() {
	return {
		type: LOGOUT_SUCCESS,
	};
}

export function logoutFailedAction(error, errorMessage) {
	return {
		type: LOGOUT_FAILED,
		error,
		errorMessage,
	};
}

export function startCheckAuthAction() {
	return {
		type: START_CHECK_AUTH,
	};
}

export function checkAuthSuccessAction() {
	return {
		type: CHECK_AUTH_SUCCESS,
	};
}

export function checkAuthFailedAction(error, errorMessage) {
	return {
		type: CHECK_AUTH_FAILED,
		error,
		errorMessage,
	};
}

export function fetchCaptchaAction() {
	return {
		type: START_FETCH_CAPTCHA,
	};
}

export function fetchCaptchaSuccessAction({ captcha }) {
	return {
		type: FETCH_CAPTCHA_SUCCESS,
		captcha,
	};
}

export function fetchCaptchaFailedAction(error, errorMessage) {
	return {
		type: FETCH_CAPTCHA_FAILED,
		error,
		errorMessage,
	};
}

export function checkCaptchaAction(username, captcha) {
	return {
		type: START_CHECK_CAPTCHA,
		username,
		captcha,
	};
}

export function checkCaptchaSuccessAction({ greeting }) {
	return {
		type: CHECK_CAPTCHA_SUCCESS,
		greeting,
	};
}

export function checkCaptchaFailedAction(error, errorMessage) {
	return {
		type: CHECK_CAPTCHA_FAILED,
		error,
		errorMessage,
	};
}

export function setIsGeoValidation(isGeoValidation) {
	return {
		type: SET_IS_GEO_VALIDATION,
		isGeoValidation,
	};
}

export function geoValidateWithPayerAction(payer) {
	return {
		type: START_GEO_VALIDATE_WITH_PAYER,
		payer,
	};
}

export function geoValidateWithPayerSuccessAction() {
	return {
		type: GEO_VALIDATE_WITH_PAYER_SUCCESS,
	};
}

export function geoValidateWithPayerFailedAction(error, errorMessage) {
	return {
		type: GEO_VALIDATE_WITH_PAYER_FAILED,
		error,
		errorMessage,
	};
}

export function updateDefaultPasswordAction(password, newPassword, confirmedPassword) {
	return {
		type: START_UPDATE_DEFAULT_PASSWORD,
		confirmedPassword,
		newPassword,
		password,
	};
}

export function updateDefaultPasswordSuccessAction() {
	return {
		type: UPDATE_DEFAULT_PASSWORD_SUCCESS
	};
}

export function updateDefaultPasswordFailedAction(error, errorMessage) {
	return {
		type: UPDATE_DEFAULT_PASSWORD_FAILED,
		error,
		errorMessage,
	};
}

export function fetchPasswordResetMethodsAction(username, captcha) {
	return {
		type: START_FETCH_PASSWORD_RESET_METHODS,
		username,
		captcha,
	};
}

export function fetchPasswordResetMethodsSuccessAction(passwordResetMethods) {
	return {
		type: FETCH_PASSWORD_RESET_METHODS_SUCCESS,
		passwordResetMethods,
	};
}

export function fetchPasswordResetMethodsFailedAction(error, errorMessage) {
	return {
		type: FETCH_PASSWORD_RESET_METHODS_FAILED,
		error,
		errorMessage,
	};
}

export function resetPasswordViaSecurityQuestionsAction(securityQuestionAnswers, newPassword) {
	return {
		type: START_RESET_PASSWORD_VIA_SECURITY_QUESTIONS,
		securityQuestionAnswers,
		newPassword,
	};
}

export function resetPasswordViaSecurityQuestionsSuccessAction() {
	return {
		type: RESET_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	};
}

export function resetPasswordViaSecurityQuestionsFailedAction(error, errorMessage) {
	return {
		type: RESET_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,
		error,
		errorMessage,
	};
}

export function resetPasswordViaGoogleTotpAction(totp, newPassword) {
	return {
		type: START_RESET_PASSWORD_VIA_GOOGLE_TOTP,
		totp,
		newPassword,
	};
}

export function resetPasswordViaGoogleTotpSuccessAction() {
	return {
		type: RESET_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	};
}

export function resetPasswordViaGoogleTotpFailedAction(error, errorMessage) {
	return {
		type: RESET_PASSWORD_VIA_GOOGLE_TOTP_FAILED,
		error,
		errorMessage,
	};
}

export function setIsCaptchaValidateAction(isCaptchaValidate) {
	return {
		type: SET_IS_CAPTCHA_VALIDATE,
		isCaptchaValidate,
	};
}

import {
	START_FETCH_USER_SECURITY,
	FETCH_USER_SECURITY_SUCCESS,
	FETCH_USER_SECURITY_FAILED,
	START_UPDATE_USER_LOGIN_PASSWORD,
	UPDATE_USER_LOGIN_PASSWORD_SUCCESS,
	UPDATE_USER_LOGIN_PASSWORD_FAILED,
	START_UPDATE_USER_BET_PASSWORD,
	UPDATE_USER_BET_PASSWORD_SUCCESS,
	UPDATE_USER_BET_PASSWORD_FAILED,
	START_UPDATE_USER_FUNDS_PASSWORD,
	UPDATE_USER_FUNDS_PASSWORD_SUCCESS,
	UPDATE_USER_FUNDS_PASSWORD_FAILED,
	START_ENABLE_LOGIN_GEO_VALIDATION,
	ENABLE_LOGIN_GEO_VALIDATION_SUCCESS,
	ENABLE_LOGIN_GEO_VALIDATION_FAILED,
	START_DISABLE_LOGIN_GEO_VALIDATION,
	DISABLE_LOGIN_GEO_VALIDATION_SUCCESS,
	DISABLE_LOGIN_GEO_VALIDATION_FAILED,
	START_UPDATE_USER_SECURITY_QUESTIONS,
	UPDATE_USER_SECURITY_QUESTIONS_SUCCESS,
	UPDATE_USER_SECURITY_QUESTIONS_FAILED,
	START_BIND_GOOGLE_AUTHENTICATION,
	BIND_GOOGLE_AUTHENTICATION_SUCCESS,
	BIND_GOOGLE_AUTHENTICATION_FAILED,
	START_UNBIND_GOOGLE_AUTHENTICATION,
	UNBIND_GOOGLE_AUTHENTICATION_SUCCESS,
	UNBIND_GOOGLE_AUTHENTICATION_FAILED,
	START_UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS,
	UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,
	START_UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS,
	UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,
	START_UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS,
	UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,
	START_UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP,
	UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP_FAILED,
	START_UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP,
	UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP_FAILED,
	START_UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP,
	UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP_FAILED,
} from '../action-types';

export function fetchUserSecurityAction() {
	return {
		type: START_FETCH_USER_SECURITY,
	};
}

export function fetchUserSecuritySuccessAction(userSecurity) {
	return {
		type: FETCH_USER_SECURITY_SUCCESS,
		userSecurity
	};
}

export function fetchUserSecurityFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_SECURITY_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserLoginPasswordAction(password, newPassword, confirmedPassword) {
	return {
		type: START_UPDATE_USER_LOGIN_PASSWORD,
		password,
		newPassword,
		confirmedPassword,
	};
}

export function updateUserLoginPasswordSuccessAction() {
	return {
		type: UPDATE_USER_LOGIN_PASSWORD_SUCCESS,
	};
}

export function updateUserLoginPasswordFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_LOGIN_PASSWORD_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserBetPasswordAction(password, newPassword, confirmedPassword) {
	return {
		type: START_UPDATE_USER_BET_PASSWORD,
		password,
		newPassword,
		confirmedPassword,
	};
}

export function updateUserBetPasswordSuccessAction() {
	return {
		type: UPDATE_USER_BET_PASSWORD_SUCCESS,
	};
}

export function updateUserBetPasswordFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_BET_PASSWORD_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserFundsPasswordAction(password, newPassword, confirmedPassword) {
	return {
		type: START_UPDATE_USER_FUNDS_PASSWORD,
		password,
		newPassword,
		confirmedPassword,
	};
}

export function updateUserFundsPasswordSuccessAction() {
	return {
		type: UPDATE_USER_FUNDS_PASSWORD_SUCCESS,
	};
}

export function updateUserFundsPasswordFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_FUNDS_PASSWORD_FAILED,
		error,
		errorMessage,
	};
}

export function enableLoginGeoValidationAction() {
	return {
		type: START_ENABLE_LOGIN_GEO_VALIDATION,
	};
}

export function enableLoginGeoValidationSuccessAction() {
	return {
		type: ENABLE_LOGIN_GEO_VALIDATION_SUCCESS,
	};
}

export function enableLoginGeoValidationFailedAction(error, errorMessage) {
	return {
		type: ENABLE_LOGIN_GEO_VALIDATION_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserSecurityQuestionsAction(password, data) {
	return {
		type: START_UPDATE_USER_SECURITY_QUESTIONS,
		password,
		data,
	};
}

export function updateUserSecurityQuestionsSuccessAction(securityQuestions) {
	return {
		type: UPDATE_USER_SECURITY_QUESTIONS_SUCCESS,
		securityQuestions,
	};
}

export function updateUserSecurityQuestionsFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_SECURITY_QUESTIONS_FAILED,
		error,
		errorMessage,
	};
}

export function bindGoogleAuthenticationAction({
	secret,
	password,
	totp,
}) {
	return {
		type: START_BIND_GOOGLE_AUTHENTICATION,
		secret,
		password,
		totp,
	};
}
export function bindGoogleAuthenticationSuccessAction() {
	return {
		type: BIND_GOOGLE_AUTHENTICATION_SUCCESS,
	};
}
export function bindGoogleAuthenticationFailedAction(error, errorMessage) {
	return {
		type: BIND_GOOGLE_AUTHENTICATION_FAILED,
		error,
		errorMessage,
	};
}

export function disableLoginGeoValidationAction(payer) {
	return {
		type: START_DISABLE_LOGIN_GEO_VALIDATION,
		payer,
	};
}

export function disableLoginGeoValidationSuccessAction() {
	return {
		type: DISABLE_LOGIN_GEO_VALIDATION_SUCCESS,
	};
}

export function disableLoginGeoValidationFailedAction(error, errorMessage) {
	return {
		type: DISABLE_LOGIN_GEO_VALIDATION_FAILED,
		error,
		errorMessage,
	};
}

export function unbindGoogleAuthenticationAction(totp) {
	return {
		type: START_UNBIND_GOOGLE_AUTHENTICATION,
		totp,
	};
}
export function unbindGoogleAuthenticationSuccessAction() {
	return {
		type: UNBIND_GOOGLE_AUTHENTICATION_SUCCESS,
	};
}
export function unbindGoogleAuthenticationFailedAction(error, errorMessage) {
	return {
		type: UNBIND_GOOGLE_AUTHENTICATION_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserLoginPasswordViaSecurityQuestionsAction(newPassword, confirmedPassword, securityQuestionAnswers) {
	return {
		type: START_UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS,
		newPassword,
		confirmedPassword,
		securityQuestionAnswers,
	};
}
export function updateUserLoginPasswordViaSecurityQuestionsSuccessAction() {
	return {
		type: UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	};
}
export function updateUserLoginPasswordViaSecurityQuestionsFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,
		error,
		errorMessage,
	};
}
export function updateUserBetPasswordViaSecurityQuestionsAction(newPassword, confirmedPassword, securityQuestionAnswers) {
	return {
		type: START_UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS,
		newPassword,
		confirmedPassword,
		securityQuestionAnswers,
	};
}
export function updateUserBetPasswordViaSecurityQuestionsSuccessAction() {
	return {
		type: UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	};
}
export function updateUserBetPasswordViaSecurityQuestionsFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,
		error,
		errorMessage,
	};
}
export function updateUserFundsPasswordViaSecurityQuestionsAction(newPassword, confirmedPassword, securityQuestionAnswers) {
	return {
		type: START_UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS,
		newPassword,
		confirmedPassword,
		securityQuestionAnswers,
	};
}
export function updateUserFundsPasswordViaSecurityQuestionsSuccessAction() {
	return {
		type: UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	};
}
export function updateUserFundsPasswordViaSecurityQuestionsFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserLoginPasswordViaGoogleTotpAction(newPassword, confirmedPassword, totp) {
	return {
		type: START_UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP,
		newPassword,
		confirmedPassword,
		totp,
	};
}
export function updateUserLoginPasswordViaGoogleTotpSuccessAction() {
	return {
		type: UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	};
}
export function updateUserLoginPasswordViaGoogleTotpFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP_FAILED,
		error,
		errorMessage,
	};
}
export function updateUserBetPasswordViaGoogleTotpAction(newPassword, confirmedPassword, totp) {
	return {
		type: START_UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP,
		newPassword,
		confirmedPassword,
		totp,
	};
}
export function updateUserBetPasswordViaGoogleTotpSuccessAction() {
	return {
		type: UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	};
}
export function updateUserBetPasswordViaGoogleTotpFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP_FAILED,
		error,
		errorMessage,
	};
}
export function updateUserFundsPasswordViaGoogleTotpAction(newPassword, confirmedPassword, totp) {
	return {
		type: START_UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP,
		newPassword,
		confirmedPassword,
		totp,
	};
}
export function updateUserFundsPasswordViaGoogleTotpSuccessAction() {
	return {
		type: UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	};
}
export function updateUserFundsPasswordViaGoogleTotpFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP_FAILED,
		error,
		errorMessage,
	};
}

import {
	START_FETCH_USER_ACCOUNT,
	FETCH_USER_ACCOUNT_SUCCESS,
	FETCH_USER_ACCOUNT_FAILED,
	START_UPDATE_USER_LOGIN_PASSWORD,
	UPDATE_USER_LOGIN_PASSWORD_SUCCESS,
	UPDATE_USER_LOGIN_PASSWORD_FAILED,
	START_UPDATE_USER_BETTING_PASSWORD,
	UPDATE_USER_BETTING_PASSWORD_SUCCESS,
	UPDATE_USER_BETTING_PASSWORD_FAILED,
	START_UPDATE_USER_FUNDS_PASSWORD,
	UPDATE_USER_FUNDS_PASSWORD_SUCCESS,
	UPDATE_USER_FUNDS_PASSWORD_FAILED,
	START_DELETE_USER_SECURITY_QUESTIONS,
	DELETE_USER_SECURITY_QUESTIONS_SUCCESS,
	DELETE_USER_SECURITY_QUESTIONS_FAILED,
	START_ENABLE_USER_LOGIN_GEO_VALIDATION,
	ENABLE_USER_LOGIN_GEO_VALIDATION_SUCCESS,
	ENABLE_USER_LOGIN_GEO_VALIDATION_FAILED,
	START_DISABLE_USER_LOGIN_GEO_VALIDATION,
	DISABLE_USER_LOGIN_GEO_VALIDATION_SUCCESS,
	DISABLE_USER_LOGIN_GEO_VALIDATION_FAILED,
	START_DISABLE_USER_GOOGLE_TOTP,
	DISABLE_USER_GOOGLE_TOTP_SUCCESS,
	DISABLE_USER_GOOGLE_TOTP_FAILED,
} from '../action-types';

export function fetchUserAccountAction(userId) {
	return {
		type: START_FETCH_USER_ACCOUNT,
		userId,
	};
}
export function fetchUserAccountSuccessAction(account) {
	return {
		type: FETCH_USER_ACCOUNT_SUCCESS,
		account,
	};
}
export function fetchUserAccountFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_ACCOUNT_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserLoginPasswordAction(userId, password) {
	return {
		type: START_UPDATE_USER_LOGIN_PASSWORD,
		userId,
		password,
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

export function updateUserBettingPasswordAction(userId, password) {
	return {
		type: START_UPDATE_USER_BETTING_PASSWORD,
		userId,
		password,
	};
}
export function updateUserBettingPasswordSuccessAction() {
	return {
		type: UPDATE_USER_BETTING_PASSWORD_SUCCESS,
	};
}
export function updateUserBettingPasswordFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_BETTING_PASSWORD_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserFundsPasswordAction(userId, password) {
	return {
		type: START_UPDATE_USER_FUNDS_PASSWORD,
		userId,
		password,
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
export function deleteUserSecurityQuestionsAction(userId) {
	return {
		type: START_DELETE_USER_SECURITY_QUESTIONS,
		userId,
	};
}
export function deleteUserSecurityQuestionsSuccessAction() {
	return {
		type: DELETE_USER_SECURITY_QUESTIONS_SUCCESS,
	};
}
export function deleteUserSecurityQuestionsFailedAction(error, errorMessage) {
	return {
		type: DELETE_USER_SECURITY_QUESTIONS_FAILED,
		error,
		errorMessage,
	};
}
export function enableUserLoginGeoValidationAction(userId) {
	return {
		type: START_ENABLE_USER_LOGIN_GEO_VALIDATION,
		userId,
	};
}
export function enableUserLoginGeoValidationSuccessAction() {
	return {
		type: ENABLE_USER_LOGIN_GEO_VALIDATION_SUCCESS,
	};
}
export function enableUserLoginGeoValidationFailedAction() {
	return {
		type: ENABLE_USER_LOGIN_GEO_VALIDATION_FAILED,
	};
}
export function disableUserLoginGeoValidationAction(userId) {
	return {
		type: START_DISABLE_USER_LOGIN_GEO_VALIDATION,
		userId,
	};
}
export function disableUserLoginGeoValidationSuccessAction() {
	return {
		type: DISABLE_USER_LOGIN_GEO_VALIDATION_SUCCESS,
	};
}
export function disableUserLoginGeoValidationFailedAction() {
	return {
		type: DISABLE_USER_LOGIN_GEO_VALIDATION_FAILED,
	};
}
export function disableUserGoogleTotpAction(userId) {
	return {
		type: START_DISABLE_USER_GOOGLE_TOTP,
		userId,
	};
}
export function disableUserGoogleTotpSuccessAction() {
	return {
		type: DISABLE_USER_GOOGLE_TOTP_SUCCESS,
	};
}
export function disableUserGoogleTotpFailedAction() {
	return {
		type: DISABLE_USER_GOOGLE_TOTP_FAILED,
	};
}

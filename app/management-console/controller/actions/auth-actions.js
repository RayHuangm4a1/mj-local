import {
	START_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,

	START_LOGOUT,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,

	START_CHECK_AUTH,
	CHECK_AUTH_SUCCESS,
	CHECK_AUTH_FAILED,
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

export function checkAuthAction() {
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

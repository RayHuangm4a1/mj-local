import {
	START_FETCH_USER_DIVIDEND_SETTINGS,
	FETCH_USER_DIVIDEND_SETTINGS_SUCCESS,
	FETCH_USER_DIVIDEND_SETTINGS_FAILED,
	START_UPDTATE_USER_DIVIDEND_SETTINGS,
	UPDTATE_USER_DIVIDEND_SETTINGS_SUCCESS,
	UPDTATE_USER_DIVIDEND_SETTINGS_FAILED,
} from '../action-types';

export function fetchUserDividendSettingsAction(userId) {
	return {
		type: START_FETCH_USER_DIVIDEND_SETTINGS,
		userId,
	};
}
export function fetchUserDividendSettingsSuccessAction(dividendSettings) {
	return {
		type: FETCH_USER_DIVIDEND_SETTINGS_SUCCESS,
		dividendSettings,
	};
}
export function fetchUserDividendSettingsFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_DIVIDEND_SETTINGS_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDividendSettingsAction(userId, dividendSettings) {
	return {
		type: START_UPDTATE_USER_DIVIDEND_SETTINGS,
		userId,
		dividendSettings,
	};
}
export function updateUserDividendSettingsSuccessAction(dividendSettings) {
	return {
		type: UPDTATE_USER_DIVIDEND_SETTINGS_SUCCESS,
		dividendSettings,
	};
}
export function updateUserDividendSettingsFailedAction(error, errorMessage) {
	return {
		type: UPDTATE_USER_DIVIDEND_SETTINGS_FAILED,
		error,
		errorMessage,
	};
}

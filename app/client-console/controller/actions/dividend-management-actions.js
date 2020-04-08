import {
	START_FETCH_DIVIDENDS,
	FETCH_DIVIDENDS_SUCCESS,
	FETCH_DIVIDENDS_FAILED,
	START_FETCH_DIVIDEND_DURATIONS,
	FETCH_DIVIDEND_DURATIONS_SUCCESS,
	FETCH_DIVIDEND_DURATIONS_FAILED,
	START_FETCH_DIVIDEND_SETTINGS_SELF,
	FETCH_DIVIDEND_SETTINGS_SELF_SUCCESS,
	FETCH_DIVIDEND_SETTINGS_SELF_FAILED,
	START_FETCH_DIVIDEND_SETTINGS_TEMPLATE,
	FETCH_DIVIDEND_SETTINGS_TEMPLATE_SUCCESS,
	FETCH_DIVIDEND_SETTINGS_TEMPLATE_FAILED,
	START_UPDATE_DIVIDEND_SETTINGS_TEMPLATE,
	UPDATE_DIVIDEND_SETTINGS_TEMPLATE_SUCCESS,
	UPDATE_DIVIDEND_SETTINGS_TEMPLATE_FAILED,
	START_UPDATE_CHILDREN_DIVIDEND_SETTINGS,
	UPDATE_CHILDREN_DIVIDEND_SETTINGS_SUCCESS,
	UPDATE_CHILDREN_DIVIDEND_SETTINGS_FAILED,
	START_GRANT_DIVIDENDS,
	GRANT_DIVIDENDS_SUCCESS,
	GRANT_DIVIDENDS_FAILED,
} from './action-types';

export function fetchDividendsAction(queries) {
	return {
		type: START_FETCH_DIVIDENDS,
		queries,
	};
}
export function fetchDividendsSuccessAction(dividends) {
	return {
		type: FETCH_DIVIDENDS_SUCCESS,
		dividends,
	};
}
export function fetchDividendsFailedAction(error, errorMessage) {
	return {
		type: FETCH_DIVIDENDS_FAILED,
		error,
		errorMessage,
	};
}

export function fetchDividendDurationsAction() {
	return {
		type: START_FETCH_DIVIDEND_DURATIONS,
	};
}
export function fetchDividendDurationsSuccessAction(durations) {
	return {
		type: FETCH_DIVIDEND_DURATIONS_SUCCESS,
		durations,
	};
}
export function fetchDividendDurationsFailedAction(error, errorMessage) {
	return {
		type: FETCH_DIVIDEND_DURATIONS_FAILED,
		error,
		errorMessage,
	};
}

export function fetchDividendSettingsSelfAction() {
	return {
		type: START_FETCH_DIVIDEND_SETTINGS_SELF,
	};
}
export function fetchUserDividendSettingsSuccessAction(dividendSettings) {
	return {
		type: FETCH_DIVIDEND_SETTINGS_SELF_SUCCESS,
		dividendSettings,
	};
}
export function fetchUserDividendSettingsFailedAction(error, errorMessage) {
	return {
		type: FETCH_DIVIDEND_SETTINGS_SELF_FAILED,
		error,
		errorMessage,
	};
}

export function fetchDividendSettingsTemplateAction() {
	return {
		type: START_FETCH_DIVIDEND_SETTINGS_TEMPLATE,
	};
}
export function fetchDividendSettingsTemplateSuccessAction(template) {
	return {
		type: FETCH_DIVIDEND_SETTINGS_TEMPLATE_SUCCESS,
		template,
	};
}
export function fetchDividendSettingsTemplateFailedAction(error, errorMessage) {
	return {
		type: FETCH_DIVIDEND_SETTINGS_TEMPLATE_FAILED,
		error,
		errorMessage,
	};
}

export function updateDividendSettingsTemplateAction(template) {
	return {
		type: START_UPDATE_DIVIDEND_SETTINGS_TEMPLATE,
		template
	};
}
export function updateDividendSettingsTemplateSuccessAction(template) {
	return {
		type: UPDATE_DIVIDEND_SETTINGS_TEMPLATE_SUCCESS,
		template,
	};
}
export function updateDividendSettingsTemplateFailedAction(error, errorMessage) {
	return {
		type: UPDATE_DIVIDEND_SETTINGS_TEMPLATE_FAILED,
		error,
		errorMessage,
	};
}

export function updateChildrenDividendSettingsAction(childrenId, dividendSettings) {
	return {
		type: START_UPDATE_CHILDREN_DIVIDEND_SETTINGS,
		childrenId,
		dividendSettings,
	};
}
export function updateChildrenDividendSettingsSuccessAction() {
	return {
		type: UPDATE_CHILDREN_DIVIDEND_SETTINGS_SUCCESS,
	};
}
export function updateChildrenDividendSettingsFailedAction(error, errorMessage) {
	return {
		type: UPDATE_CHILDREN_DIVIDEND_SETTINGS_FAILED,
		error,
		errorMessage,
	};
}

export function grantDividendAction(childrenId, walletCode, amount, password) {
	return {
		type: START_GRANT_DIVIDENDS,
		childrenId,
		walletCode,
		amount,
		password,
	};
}
export function grantDividendSuccessAction(payload) {
	return {
		type: GRANT_DIVIDENDS_SUCCESS,
		payload,
	};
}
export function grantDividendFailedAction(error, errorMessage) {
	return {
		type: GRANT_DIVIDENDS_FAILED,
		error,
		errorMessage,
	};
}

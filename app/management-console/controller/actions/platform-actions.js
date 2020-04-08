import {
	START_FETCH_PLATFORM,
	FETCH_PLATFORM_SUCCESS,
	FETCH_PLATFORM_FAILED,
	START_UPDATE_BONUS_RULES,
	UPDATE_BONUS_RULES_SUCCESS,
	UPDATE_BONUS_RULES_FAILED,
	START_UPDATE_PLATFORM_DIVIDEND_SETTINGS,
	UPDATE_PLATFORM_DIVIDEND_SETTINGS_SUCCESS,
	UPDATE_PLATFORM_DIVIDEND_SETTINGS_FAILED,
	START_UPDATE_PLATFORM_FIXED_WAGE,
	UPDATE_PLATFORM_FIXED_WAGE_SUCCESS,
	UPDATE_PLATFORM_FIXED_WAGE_FAILED,
} from './action-types';

export function fetchPlatformAction() {
	return {
		type: START_FETCH_PLATFORM
	};
}

export function fetchPlatformSuccessAction(payload) {
	return {
		type: FETCH_PLATFORM_SUCCESS,
		payload,
	};
}

export function fetchPlatformFailedAction(error, errorMessage) {
	return {
		type: FETCH_PLATFORM_FAILED,
		error,
		errorMessage,
	};
}

export function updateBonusRulesAction({
	ruleId,
	rule,
}) {
	return {
		type: START_UPDATE_BONUS_RULES,
		ruleId,
		rule,
	};
}

export function updateBonusRulesSuccessAction(payload) {
	return {
		type: UPDATE_BONUS_RULES_SUCCESS,
		payload,
	};
}

export function updateBonusRulesFailedAction(error, errorMessage) {
	return {
		type: UPDATE_BONUS_RULES_FAILED,
		error,
		errorMessage,
	};
}

export function updatePlatformDividendSettingsAction(dividendSetting) {
	return {
		type: START_UPDATE_PLATFORM_DIVIDEND_SETTINGS,
		dividendSetting,
	};
}

export function updatePlatformDividendSettingsSuccessAction(dividendSetting) {
	return {
		type: UPDATE_PLATFORM_DIVIDEND_SETTINGS_SUCCESS,
		dividendSetting,
	};
}

export function updatePlatformDividendSettingsFailedAction(error, errorMessage) {
	return {
		type: UPDATE_PLATFORM_DIVIDEND_SETTINGS_FAILED,
		error,
		errorMessage,
	};
}

export function updatePlatformFixedWageAction(fixedWage) {
	return {
		type: START_UPDATE_PLATFORM_FIXED_WAGE,
		fixedWage,
	};
}

export function updatePlatformFixedWageSuccessAction(fixedWage) {
	return {
		type: UPDATE_PLATFORM_FIXED_WAGE_SUCCESS,
		fixedWage,
	};
}

export function updatePlatformFixedWageFailedAction(error, errorMessage) {
	return {
		type: UPDATE_PLATFORM_FIXED_WAGE_FAILED,
		error,
		errorMessage,
	};
}

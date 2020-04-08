import {
	START_INIT_USER_BONUS_RULES_MANAGEMENT_PAGE,
	INIT_USER_BONUS_RULES_MANAGEMENT_PAGE_SUCCESS,
	INIT_USER_BONUS_RULES_MANAGEMENT_PAGE_FAILED,
} from './action-types';

export function initUserBonusRulesManagementPageAction() {
	return {
		type: START_INIT_USER_BONUS_RULES_MANAGEMENT_PAGE,
	};
}

export function initUserBonusRulesManagementPageSuccessAction(payload) {
	return {
		type: INIT_USER_BONUS_RULES_MANAGEMENT_PAGE_SUCCESS,
		payload,
	};
}
export function initUserBonusRulesManagementPageFailedAction(error, errorMessage) {
	return {
		type: INIT_USER_BONUS_RULES_MANAGEMENT_PAGE_FAILED,
		error,
		errorMessage,
	};
}

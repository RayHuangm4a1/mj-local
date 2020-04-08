import {
	START_INIT_USER_DIVIDEND_WAGE_RULE_PAGE,
	INIT_USER_DIVIDEND_WAGE_RULE_PAGE_SUCCESS,
	INIT_USER_DIVIDEND_WAGE_RULE_PAGE_FAILED,
} from '../action-types';

export function initUserDividendWageRulePageAction(userId) {
	return {
		type: START_INIT_USER_DIVIDEND_WAGE_RULE_PAGE,
		userId,
	};
}
export function initUserDividendWageRulePageSuccessAction() {
	return {
		type: INIT_USER_DIVIDEND_WAGE_RULE_PAGE_SUCCESS,
	};
}
export function initUserDividendWageRulePageFailedAction(error, errorMessage) {
	return {
		type: INIT_USER_DIVIDEND_WAGE_RULE_PAGE_FAILED,
		error,
		errorMessage,
	};
}

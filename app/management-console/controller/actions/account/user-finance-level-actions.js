import {
	START_FETCH_USER_FINANCE_LEVEL,
	FETCH_USER_FINANCE_LEVEL_SUCCESS,
	FETCH_USER_FINANCE_LEVEL_FAILED,
	START_UPDATE_USER_FINANCE_LEVEL,
	UPDATE_USER_FINANCE_LEVEL_SUCCESS,
	UPDATE_USER_FINANCE_LEVEL_FAILED,
} from '../action-types';

export function fetchUserFinanceLevelAction(username) {
	return {
		type: START_FETCH_USER_FINANCE_LEVEL,
		username,
	};
}
export function fetchUserFinanceLevelSuccessAction(financeLevel) {
	return {
		type: FETCH_USER_FINANCE_LEVEL_SUCCESS,
		financeLevel,
	};
}
export function fetchUserFinanceLevelFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_FINANCE_LEVEL_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserFinanceLevelAction(userId, { levelId, levelExpiredAt, } = {}) {
	return {
		type: START_UPDATE_USER_FINANCE_LEVEL,
		userId,
		levelId,
		levelExpiredAt,
	};
}
export function updateUserFinanceLevelSuccessAction() {
	return {
		type: UPDATE_USER_FINANCE_LEVEL_SUCCESS,
	};
}
export function updateUserFinanceLevelFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_FINANCE_LEVEL_FAILED,
		error,
		errorMessage,
	};
}

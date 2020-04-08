import {
	START_INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE,
	INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE_SUCCESS,
	INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE_FAILED,
	START_REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS,
	REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS_SUCCESS,
	REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS_FAILED,
	START_FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL,
	FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL_SUCCESS,
	FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL_FAILED,
} from '../action-types';

export function initCashSystemHierarchicalManagementPageAction() {
	return {
		type: START_INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE,
	};
}
export function initCashSystemHierarchicalManagementPageSuccessAction() {
	return {
		type: INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE_SUCCESS,
	};
}
export function initCashSystemHierarchicalManagementPageFailedAction(error, errorMessage) {
	return {
		type: INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE_FAILED,
		error,
		errorMessage,
	};
}

export function refreshCashSystemHierarchicalManagementNormalLevelsAction() {
	return {
		type: START_REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS,
	};
}
export function refreshCashSystemHierarchicalManagementNormalLevelsSuccessAction() {
	return {
		type: REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS_SUCCESS,
	};
}
export function refreshCashSystemHierarchicalManagementNormalLevelsFailedAction(error, errorMessage) {
	return {
		type: REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS_FAILED,
		error,
		errorMessage,
	};
}

export function fetchCashSystemHierarchicalManagementUserLevelAction(username) {
	return {
		type: START_FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL,
		username,
	};
}
export function fetchCashSystemHierarchicalManagementUserLevelSuccessAction() {
	return {
		type: FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL_SUCCESS,
	};
}
export function fetchCashSystemHierarchicalManagementUserLevelFailedAction(error, errorMessage) {
	return {
		type: FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL_FAILED,
		error,
		errorMessage,
	};
}

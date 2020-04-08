import {
	START_FETCH_FINANCE_LEVELS,
	FETCH_FINANCE_LEVELS_SUCCESS,
	FETCH_FINANCE_LEVELS_FAILED,

	START_UPDATE_FINANCE_NORMAL_LEVELS,
	UPDATE_FINANCE_NORMAL_LEVELS_SUCCESS,
	UPDATE_FINANCE_NORMAL_LEVELS_FAILED,

	START_UPDATE_FINANCE_SPECIAL_LEVELS,
	UPDATE_FINANCE_SPECIAL_LEVELS_SUCCESS,
	UPDATE_FINANCE_SPECIAL_LEVELS_FAILED,

	START_FETCH_FINANCE_LEVEL_USERS,
	FETCH_FINANCE_LEVEL_USERS_SUCCESS,
	FETCH_FINANCE_LEVEL_USERS_FAILED,
} from './action-types';

export function fetchFinanceLevelsAction() {
	return {
		type: START_FETCH_FINANCE_LEVELS,
	};
}
export function fetchFinanceLevelsSuccessAction(financeLevels) {
	return {
		type: FETCH_FINANCE_LEVELS_SUCCESS,
		financeLevels,
	};
}
export function fetchFinanceLevelsFailedAction(error, errorMessage) {
	return {
		type: FETCH_FINANCE_LEVELS_FAILED,
		error,
		errorMessage,
	};
}
export function updateFinanceNormalLevelsAction(
	levelId,
	{
		isBettingAmountGreaterThanDepositAmount,
		description,
		status,
		withdrawalAmount,
		numOfWithdraws,
		bettingAmount,
		depositAmount,
		numOfDeposits,
		numOfRegisteredDays,
		registeredBefore,
		registeredAfter,
		name,
	}
) {
	return {
		type: START_UPDATE_FINANCE_NORMAL_LEVELS,
		levelId,
		isBettingAmountGreaterThanDepositAmount,
		description,
		status,
		withdrawalAmount,
		numOfWithdraws,
		bettingAmount,
		depositAmount,
		numOfDeposits,
		numOfRegisteredDays,
		registeredBefore,
		registeredAfter,
		name,
	};
}
export function updateFinanceNormalLevelsSuccessAction() {
	return {
		type: UPDATE_FINANCE_NORMAL_LEVELS_SUCCESS,
	};
}
export function updateFinanceNormalLevelsFailedAction(error, errorMessage) {
	return {
		type: UPDATE_FINANCE_NORMAL_LEVELS_FAILED,
		error,
		errorMessage,
	};
}
export function updateFinanceSpecialLevelsAction(
	levelId,
	{
		status,
		name,
	}
) {
	return {
		type: START_UPDATE_FINANCE_SPECIAL_LEVELS,
		levelId,
		status,
		name,
	};
}
export function updateFinanceSpecialLevelsSuccessAction() {
	return {
		type: UPDATE_FINANCE_SPECIAL_LEVELS_SUCCESS,
	};
}
export function updateFinanceSpecialLevelsFailedAction(error, errorMessage) {
	return {
		type: UPDATE_FINANCE_SPECIAL_LEVELS_FAILED,
		error,
		errorMessage,
	};
}
export function fetchFinanceLevelUsersAction(levelId, queries,) {
	return {
		type: START_FETCH_FINANCE_LEVEL_USERS,
		levelId,
		queries,
	};
}

export function fetchFinanceLevelUsersSuccessAction({ data, numOfItems, numOfPages }) {
	return {
		type: FETCH_FINANCE_LEVEL_USERS_SUCCESS,
		data,
		numOfItems,
		numOfPages,
	};
}

export function fetchFinanceLevelUsersFailedAction(error, errorMessage) {
	return {
		type: FETCH_FINANCE_LEVEL_USERS_FAILED,
		error,
		errorMessage,
	};
}

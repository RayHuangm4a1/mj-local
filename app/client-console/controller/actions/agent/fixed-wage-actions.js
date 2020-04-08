import {
	START_FETCH_FIXED_WAGES,
	FETCH_FIXED_WAGES_SUCCESS,
	FETCH_FIXED_WAGES_FAILED,
	START_UPDATE_USER_FIXED_WAGE,
	UPDATE_USER_FIXED_WAGE_SUCCESS,
	UPDATE_USER_FIXED_WAGE_FAILED,
} from '../action-types';

export function fetchFixedWagesAction(query) {
	return {
		type: START_FETCH_FIXED_WAGES,
		query,
	};
}

export function fetchFixedWagesSuccessAction({ children = [], numOfItems = 0, numOfPages = 0, page = 1, }) {
	return {
		type: FETCH_FIXED_WAGES_SUCCESS,
		children,
		numOfItems,
		numOfPages,
		page,
	};
}

export function fetchFixedWagesFailedAction(error, errorMessage) {
	return {
		type: FETCH_FIXED_WAGES_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserFixedWageAction(childrenId, fixedWage) {
	return {
		type: START_UPDATE_USER_FIXED_WAGE,
		childrenId,
		fixedWage,
	};
}

export function updateUserFixedWageSuccessAction(childrenId, fixedWage) {
	return {
		type: UPDATE_USER_FIXED_WAGE_SUCCESS,
		childrenId,
		fixedWage,
	};
}

export function updateUserFixedWageFailedAction(error, errorMessage,) {
	return {
		type: UPDATE_USER_FIXED_WAGE_FAILED,
		error,
		errorMessage,
	};
}

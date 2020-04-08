import {
	START_FETCH_ZHAO_SHANG_ACCOUNTS,
	FETCH_ZHAO_SHANG_ACCOUNTS_SUCCESS,
	FETCH_ZHAO_SHANG_ACCOUNTS_FAILED,

	START_CREATE_ZHAO_SHANG_ACCOUNT,
	CREATE_ZHAO_SHANG_ACCOUNT_SUCCESS,
	CREATE_ZHAO_SHANG_ACCOUNT_FAILED,

} from './action-types';

export function fetchZhaoShangAccountsAction({
	limit,
	page,
	sort,
	order,
} = {}) {
	return {
		type: START_FETCH_ZHAO_SHANG_ACCOUNTS,
		limit,
		page,
		sort,
		order,
	};
}

export function fetchZhaoShangAccountsSuccessAction({
	data,
	numOfItems,
	numOfPages,
} = {}) {
	return {
		type: FETCH_ZHAO_SHANG_ACCOUNTS_SUCCESS,
		data,
		numOfItems,
		numOfPages,
	};
}

export function fetchZhaoShangAccountsFailedAction(error, errorMessage) {
	return {
		type: FETCH_ZHAO_SHANG_ACCOUNTS_FAILED,
		error,
		errorMessage,
	};
}

export function createZhaoShangAccountAction(
	username,
	password,
	bonus,
	nickname,
) {
	return {
		type: START_CREATE_ZHAO_SHANG_ACCOUNT,
		username,
		password,
		nickname,
		bonus,
	};
}

export function createZhaoShangAccountSuccessAction() {
	return {
		type: CREATE_ZHAO_SHANG_ACCOUNT_SUCCESS,
	};
}

export function createZhaoShangAccountFailedAction(error, errorMessage) {
	return {
		type: CREATE_ZHAO_SHANG_ACCOUNT_FAILED,
		error,
		errorMessage,
	};
}

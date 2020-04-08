import {
	START_FETCH_CASH_SYSTEM_BANK_DEPOSIT,
	FETCH_CASH_SYSTEM_BANK_DEPOSIT_SUCCESS,
	FETCH_CASH_SYSTEM_BANK_DEPOSIT_FAILED,
} from '../action-types';

export function fetchCashSystemBankDepositAction(departmentId, depositClassId, query) {
	return {
		type: START_FETCH_CASH_SYSTEM_BANK_DEPOSIT,
		departmentId,
		depositClassId,
		query,
	};
}

export function fetchCashSystemBankDepositSuccessAction({ data, numOfItems, numOfPages }) {
	return {
		type: FETCH_CASH_SYSTEM_BANK_DEPOSIT_SUCCESS,
		data,
		numOfItems,
		numOfPages,
	};
}

export function fetchCashSystemBankDepositFailedAction(error, errorMessage) {
	return {
		type: FETCH_CASH_SYSTEM_BANK_DEPOSIT_FAILED,
		error,
		errorMessage,
	};
}

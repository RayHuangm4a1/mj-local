import {
	START_FETCH_DIVIDEND_TRANSACTION_LOGS,
	FETCH_DIVIDEND_TRANSACTION_LOGS_SUCCESS,
	FETCH_DIVIDEND_TRANSACTION_LOGS_FAILED,
} from '../action-types';

export function fetchDividendTransactionLogsAction({
	page,
	limit,
	id,
	type,
	from,
	to,
	sort,
	order,
} = {}) {
	return {
		type: START_FETCH_DIVIDEND_TRANSACTION_LOGS,
		queries: {
			limit,
			page,
			id,
			type,
			from,
			to,
			sort,
			order,
		},
	};
}
export function fetchDividendTransactionLogsSuccessAction({ data, numOfItems, page, }) {
	return {
		type: FETCH_DIVIDEND_TRANSACTION_LOGS_SUCCESS,
		data,
		numOfItems,
		page,
	};
}
export function fetchDividendTransactionLogsFailedAction(error, errorMessage) {
	return {
		type: FETCH_DIVIDEND_TRANSACTION_LOGS_FAILED,
		error,
		errorMessage,
	};
}

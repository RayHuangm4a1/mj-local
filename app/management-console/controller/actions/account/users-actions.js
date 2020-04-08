import {
	START_FETCH_USERS,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILED,
} from '../action-types';

export function fetchUsersAction({ username, type, status, online, payer, bankCardNumber, }) {
	return {
		type: START_FETCH_USERS,
		queries: {
			username,
			type,
			status,
			online,
			payer,
			bankCardNumber,
		},
	};
}
export function fetchUsersSuccessAction({ data, numOfPages, numOfItems }) {
	return {
		type: FETCH_USERS_SUCCESS,
		data,
		numOfPages,
		numOfItems,
	};
}
export function fetchUsersFailedAction(error, errorMessage) {
	return {
		type: FETCH_USERS_FAILED,
		error,
		errorMessage,
	};
}

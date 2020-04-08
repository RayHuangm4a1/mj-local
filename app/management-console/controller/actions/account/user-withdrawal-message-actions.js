import {
	START_FETCH_USER_WITHDRAWAL_MESSAGE,
	FETCH_USER_WITHDRAWAL_MESSAGE_SUCCESS,
	FETCH_USER_WITHDRAWAL_MESSAGE_FAILED,
	START_UPDATE_USER_WITHDRAWAL_MESSAGE,
	UPDATE_USER_WITHDRAWAL_MESSAGE_SUCCESS,
	UPDATE_USER_WITHDRAWAL_MESSAGE_FAILED,
	START_DELETE_USER_WITHDRAWAL_MESSAGE,
	DELETE_USER_WITHDRAWAL_MESSAGE_SUCCESS,
	DELETE_USER_WITHDRAWAL_MESSAGE_FAILED,
} from '../action-types';

export function fetchUserWithdrawalMessageAction(userId) {
	return {
		type: START_FETCH_USER_WITHDRAWAL_MESSAGE,
		userId,
	};
}
export function fetchUserWithdrawalMessageSuccessAction({ message, }) {
	return {
		type: FETCH_USER_WITHDRAWAL_MESSAGE_SUCCESS,
		message,
	};
}
export function fetchUserWithdrawalMessageFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_WITHDRAWAL_MESSAGE_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserWithdrawalMessageAction(userId, message) {
	return {
		type: START_UPDATE_USER_WITHDRAWAL_MESSAGE,
		userId,
		message,
	};
}
export function updateUserWithdrawalMessageSuccessAction() {
	return {
		type: UPDATE_USER_WITHDRAWAL_MESSAGE_SUCCESS,
	};
}
export function updateUserWithdrawalMessageFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_WITHDRAWAL_MESSAGE_FAILED,
		error,
		errorMessage,
	};
}

export function deleteUserWithdrawalMessageAction(userId) {
	return {
		type: START_DELETE_USER_WITHDRAWAL_MESSAGE,
		userId,
	};
}
export function deleteUserWithdrawalMessageSuccessAction() {
	return {
		type: DELETE_USER_WITHDRAWAL_MESSAGE_SUCCESS,
	};
}
export function deleteUserWithdrawalMessageFailedAction(error, errorMessage) {
	return {
		type: DELETE_USER_WITHDRAWAL_MESSAGE_FAILED,
		error,
		errorMessage,
	};
}

import {
	START_FETCH_USER_BANK_CARDS,
	FETCH_USER_BANK_CARDS_SUCCESS,
	FETCH_USER_BANK_CARDS_FAILED,
	START_CREATE_USER_BANK_CARD,
	CREATE_USER_BANK_CARD_SUCCESS,
	CREATE_USER_BANK_CARD_FAILED,
	START_DELETE_USER_BANK_CARD,
	DELETE_USER_BANK_CARD_SUCCESS,
	DELETE_USER_BANK_CARD_FAILED,
	START_ENABLE_USER_BANK_CARD_WITHDRAWABLE,
	ENABLE_USER_BANK_CARD_WITHDRAWABLE_FAILED,
	ENABLE_USER_BANK_CARD_WITHDRAWABLE_SUCCESS,
	START_UPDATE_USER_BANK_CARD_NUMBER,
	UPDATE_USER_BANK_CARD_UNMBER_SUCCESS,
	UPDATE_USER_BANK_CARD_UNMBER_FAILED,
	START_ENABLE_USER_BANK_CARD,
	ENABLE_USER_BANK_CARD_SUCCESS,
	ENABLE_USER_BANK_CARD_FAILED,
	START_DISABLE_USER_BANK_CARD,
	DISABLE_USER_BANK_CARD_SUCCESS,
	DISABLE_USER_BANK_CARD_FAILED,
} from '../action-types';

export function fetchUserBankCardsAction(userId, queries = {}) {
	return {
		type: START_FETCH_USER_BANK_CARDS,
		userId,
		queries,
	};
}
export function fetchUserBankCardsSuccessAction(bankCards) {
	return {
		type: FETCH_USER_BANK_CARDS_SUCCESS,
		bankCards,
	};
}
export function fetchUserBankCardsFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_BANK_CARDS_FAILED,
		error,
		errorMessage,
	};
}
export function createUserBankCardAction(userId, number) {
	return {
		type: START_CREATE_USER_BANK_CARD,
		userId,
		number,
	};
}
export function createUserBankCardSuccessAction(bankCard) {
	return {
		type: CREATE_USER_BANK_CARD_SUCCESS,
		bankCard,
	};
}
export function createUserBankCardFailedAction(error, errorMessage) {
	return {
		type: CREATE_USER_BANK_CARD_FAILED,
		error,
		errorMessage,
	};
}
export function deleteUserBankCardAction(userId, bankCardId) {
	return {
		type: START_DELETE_USER_BANK_CARD,
		userId,
		bankCardId,
	};
}
export function deleteUserBankCardSuccessAction(bankCardId) {
	return {
		type: DELETE_USER_BANK_CARD_SUCCESS,
		bankCardId,
	};
}
export function deleteUserBankCardFailedAction(error, errorMessage) {
	return {
		type: DELETE_USER_BANK_CARD_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserBankCardNumberAction(userId, bankCardId, number) {
	return {
		type: START_UPDATE_USER_BANK_CARD_NUMBER,
		userId,
		bankCardId,
		number,
	};
}
export function updateUserBankCardNumberSuccessAction(bankCard, oldBankCardId) {
	return {
		type: UPDATE_USER_BANK_CARD_UNMBER_SUCCESS,
		bankCard,
		oldBankCardId,
	};
}
export function updateUserBankCardNumberFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_BANK_CARD_UNMBER_FAILED,
		error,
		errorMessage,
	};
}
export function enableUserBankCardAction(userId, bankCardId) {
	return {
		type: START_ENABLE_USER_BANK_CARD,
		userId,
		bankCardId,
	};
}

export function enableUserBankCardWithdrawableAction(userId, bankCardId) {
	return {
		type: START_ENABLE_USER_BANK_CARD_WITHDRAWABLE,
		userId,
		bankCardId,
	};
}
export function enableUserBankCardWithdrawableSuccessAction(bankCard) {
	return {
		type: ENABLE_USER_BANK_CARD_WITHDRAWABLE_SUCCESS,
		bankCard,
	};
}
export function enableUserBankCardWithdrawableFailedAction(error, errorMessage) {
	return {
		type: ENABLE_USER_BANK_CARD_WITHDRAWABLE_FAILED,
		error,
		errorMessage,
	};
}
export function enableUserBankCardSuccessAction(bankCard) {
	return {
		type: ENABLE_USER_BANK_CARD_SUCCESS,
		bankCard,
	};
}
export function enableUserBankCardFailedAction(error, errorMessage) {
	return {
		type: ENABLE_USER_BANK_CARD_FAILED,
		error,
		errorMessage,
	};
}
export function disableUserBankCardAction(userId, bankCardId) {
	return {
		type: START_DISABLE_USER_BANK_CARD,
		userId,
		bankCardId,
	};
}
export function disableUserBankCardSuccessAction(bankCard) {
	return {
		type: DISABLE_USER_BANK_CARD_SUCCESS,
		bankCard,
	};
}
export function disableUserBankCardFailedAction(error, errorMessage) {
	return {
		type: DISABLE_USER_BANK_CARD_FAILED,
		error,
		errorMessage,
	};
}


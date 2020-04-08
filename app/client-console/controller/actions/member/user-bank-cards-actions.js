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
} from '../action-types';

export function fetchUserBankCardsAction() {
	return {
		type: START_FETCH_USER_BANK_CARDS,
	};
}
export function fetchUserBankCardsSuccessAction(bankCards) {
	return {
		type: FETCH_USER_BANK_CARDS_SUCCESS,
		bankCards
	};
}
export function fetchUserBankCardsFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_BANK_CARDS_FAILED,
		error,
		errorMessage,
	};
}
export function createUserBankCardAction(number, { payer, }) {
	return {
		type: START_CREATE_USER_BANK_CARD,
		number,
		payer,
	};
}
export function createUserBankCardSuccessAction(bankCard) {
	return {
		type: CREATE_USER_BANK_CARD_SUCCESS,
		bankCard
	};
}
export function createUserBankCardFailedAction(error, errorMessage) {
	return {
		type: CREATE_USER_BANK_CARD_FAILED,
		error,
		errorMessage,
	};
}
export function deleteUserBankCardAction(bankCardId, password) {
	return {
		type: START_DELETE_USER_BANK_CARD,
		bankCardId,
		password,
	};
}
export function deleteUserBankCardSuccessAction(bankCardId) {
	return {
		type: DELETE_USER_BANK_CARD_SUCCESS,
		bankCardId
	};
}
export function deleteUserBankCardFailedAction(error, errorMessage) {
	return {
		type: DELETE_USER_BANK_CARD_FAILED,
		error,
		errorMessage,
	};
}

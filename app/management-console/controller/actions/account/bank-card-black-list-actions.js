import {
	START_FETCH_BANK_CARD_BLACK_LIST,
	FETCH_BANK_CARD_BLACK_LIST_SUCCESS,
	FETCH_BANK_CARD_BLACK_LIST_FAILED,
	START_ADD_BANK_CARDS_TO_BLACK_LIST,
	ADD_BANK_CARDS_TO_BLACK_LIST_SUCCESS,
	ADD_BANK_CARDS_TO_BLACK_LIST_FAILED,
	START_REMOVE_BANK_CARD_FROM_BLACK_LIST,
	REMOVE_BANK_CARD_FROM_BLACK_LIST_SUCCESS,
	REMOVE_BANK_CARD_FROM_BLACK_LIST_FAILED,
} from '../action-types';

export function fetchBankCardBlackListAction(queries) {
	return {
		type: START_FETCH_BANK_CARD_BLACK_LIST,
		queries,
	};
}

export function fetchBankCardBlackListSuccessAction(bankCardBlackList) {
	return {
		type: FETCH_BANK_CARD_BLACK_LIST_SUCCESS,
		bankCardBlackList,
	};
}

export function fetchBankCardBlackListFailedAction(error, errorMessage) {
	return {
		type: FETCH_BANK_CARD_BLACK_LIST_FAILED,
		error,
		errorMessage,
	};
}

export function addBankCardsToBlackListAction(bankCards) {
	return {
		type: START_ADD_BANK_CARDS_TO_BLACK_LIST,
		bankCards,
	};
}

export function addBankCardsToBlackListSuccessAction() {
	return {
		type: ADD_BANK_CARDS_TO_BLACK_LIST_SUCCESS,
	};
}

export function addBankCardsToBlackListFailedAction(error, errorMessage) {
	return {
		type: ADD_BANK_CARDS_TO_BLACK_LIST_FAILED,
		error,
		errorMessage,
	};
}

export function removeBankCardFromBlackListAction(bankCardId) {
	return {
		type: START_REMOVE_BANK_CARD_FROM_BLACK_LIST,
		bankCardId,
	};
}

export function removeBankCardFromBlackListSuccessAction(bankCardId) {
	return {
		type: REMOVE_BANK_CARD_FROM_BLACK_LIST_SUCCESS,
		bankCardId,
	};
}

export function removeBankCardFromBlackListFailedAction(error, errorMessage) {
	return {
		type: REMOVE_BANK_CARD_FROM_BLACK_LIST_FAILED,
		error,
		errorMessage,
	};
}

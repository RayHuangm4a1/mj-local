import { Map, } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;
const {
	START_FETCH_BANK_CARD_BLACK_LIST,
	FETCH_BANK_CARD_BLACK_LIST_SUCCESS,
	FETCH_BANK_CARD_BLACK_LIST_FAILED,
	START_ADD_BANK_CARDS_TO_BLACK_LIST,
	ADD_BANK_CARDS_TO_BLACK_LIST_SUCCESS,
	ADD_BANK_CARDS_TO_BLACK_LIST_FAILED,
	START_REMOVE_BANK_CARD_FROM_BLACK_LIST,
	REMOVE_BANK_CARD_FROM_BLACK_LIST_SUCCESS,
	REMOVE_BANK_CARD_FROM_BLACK_LIST_FAILED,
} = actionTypes;

/*
example
{
	bankCardBlackList: [
		{
			id: 2,
			bankId: 3080000,
			bankName: "招商银行",
			number: "6223356000199111",
			status: 3,
			blockedPayer: "Jason",
			description: "I don't feel so good.",
			operatorId: 2,
			operatorUsername: "admin",
			blockedAt: "2020-02-26T02:34:14.000Z",
			createdAt: "2020-02-25T09:26:02.000Z",
			updatedAt: "2020-02-25T09:26:02.000Z"
		},
		{
			id: 1,
			bankId: 3080000,
			bankName: "招商银行",
			number: "6225760008219524",
			status: 3,
			blockedPayer: "Jason",
			description: "I don't feel so good.",
			operatorId: 2,
			operatorUsername: "admin",
			blockedAt: "2020-02-26T02:34:14.000Z",
			createdAt: "2020-02-25T09:25:58.000Z",
			updatedAt: "2020-02-25T09:25:58.000Z"
		},
	],
	"numOfItems": 2,
	"numOfPages": 1
}
*/

const initialState = Map({
	data: Map({
		bankCardBlackList: [],

		numOfItems: 0,
		numOfPages: 1,
	}),
	loadingStatus: NONE,
	loadingStatusMessage: '',
	addBankCardToBlackListLoadingStatus: NONE,
	addBankCardToBlackListLoadingStatusMessage: '',
	removeBankCardFromBlackListLoadingStatus: NONE,
	removeBankCardFromBlackListLoadingStatusMessage: '',
});

export default function userBonusRulesManagementPage(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_BANK_CARD_BLACK_LIST:
			return state.set('loadingStatus', LOADING);
		case FETCH_BANK_CARD_BLACK_LIST_SUCCESS: {
			const { bankCardBlackList, } = action;
			const { data, numOfItems, numOfPages, } = bankCardBlackList;

			return state
				.setIn(['data', 'bankCardBlackList'], data)
				.setIn(['data', 'numOfItems'], numOfItems)
				.setIn(['data', 'numOfPages'], numOfPages)
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_BANK_CARD_BLACK_LIST_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case START_ADD_BANK_CARDS_TO_BLACK_LIST:
			return state.set('addBankCardToBlackListLoadingStatus', LOADING);
		case ADD_BANK_CARDS_TO_BLACK_LIST_SUCCESS:
			return state.set('addBankCardToBlackListLoadingStatus', SUCCESS);
		case ADD_BANK_CARDS_TO_BLACK_LIST_FAILED:
			return state
				.set('addBankCardToBlackListLoadingStatus', FAILED)
				.set('addBankCardToBlackListLoadingStatusMessage', action.errorMessage);
		case START_REMOVE_BANK_CARD_FROM_BLACK_LIST:
			return state.set('removeBankCardFromBlackListLoadingStatus', LOADING);
		case REMOVE_BANK_CARD_FROM_BLACK_LIST_SUCCESS:
			return state.set('removeBankCardFromBlackListLoadingStatus', SUCCESS);
		case REMOVE_BANK_CARD_FROM_BLACK_LIST_FAILED:
			return state
				.set('removeBankCardFromBlackListLoadingStatus', FAILED)
				.set('removeBankCardFromBlackListLoadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

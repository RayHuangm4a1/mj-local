import { Map, List, } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_USER_BANK_CARDS,
	FETCH_USER_BANK_CARDS_SUCCESS,
	FETCH_USER_BANK_CARDS_FAILED,
	START_CREATE_USER_BANK_CARD,
	CREATE_USER_BANK_CARD_SUCCESS,
	CREATE_USER_BANK_CARD_FAILED,
	START_DELETE_USER_BANK_CARD,
	DELETE_USER_BANK_CARD_SUCCESS,
	DELETE_USER_BANK_CARD_FAILED,
} = actionTypes;

/* Example
data: List([
	{
		"id": 1,
		"bankName": "招商银行",
		"number": "9524",
		"payer": "測試者",
		"activatedAt": "2020-01-13T10:37:46.000Z",
		"withdrawableAt": "2020-01-15T10:37:46.000Z"
	},
	...
]),
*/

const initialState = Map({
	data: List(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
	createLoadingStatus: LoadingStatusEnum.NONE,
	createLoadingStatusMessage: '',
	deleteLoadingStatus: LoadingStatusEnum.NONE,
	deleteLoadingStatusMessage: '',
});

export default function userStats(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_BANK_CARDS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_USER_BANK_CARDS_SUCCESS:
			return state
				.set('data', List(action.bankCards))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_USER_BANK_CARDS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case START_CREATE_USER_BANK_CARD:
			return state.set('createLoadingStatus', LoadingStatusEnum.LOADING);
		case CREATE_USER_BANK_CARD_SUCCESS: {
			const updatedBankCards= state.get('data').push(action.bankCard);

			return state
				.set('data', updatedBankCards)
				.set('createLoadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case CREATE_USER_BANK_CARD_FAILED:
			return state
				.set('createLoadingStatus', LoadingStatusEnum.FAILED)
				.set('createLoadingStatusMessage', action.errorMessage);
		case START_DELETE_USER_BANK_CARD:
			return state.set('deleteLoadingStatus', LoadingStatusEnum.LOADING);
		case DELETE_USER_BANK_CARD_SUCCESS: {
			const updatedBankCards = state.get('data').filter((bankCard) => bankCard.id !== action.bankCardId);

			return state
				.set('data', updatedBankCards)
				.set('deleteLoadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case DELETE_USER_BANK_CARD_FAILED:
			return state
				.set('deleteLoadingStatus', LoadingStatusEnum.FAILED)
				.set('deleteLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

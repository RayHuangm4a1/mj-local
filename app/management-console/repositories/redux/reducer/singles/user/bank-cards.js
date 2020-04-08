import { Map, List, } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum, } from '../../../../../lib/enums';

const { NONE, LOADING, SUCCESS, FAILED, } = LoadingStatusEnum;
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
	START_ENABLE_USER_BANK_CARD_WITHDRAWABLE,
	ENABLE_USER_BANK_CARD_WITHDRAWABLE_SUCCESS,
	ENABLE_USER_BANK_CARD_WITHDRAWABLE_FAILED,
	START_UPDATE_USER_BANK_CARD_NUMBER,
	UPDATE_USER_BANK_CARD_UNMBER_SUCCESS,
	UPDATE_USER_BANK_CARD_UNMBER_FAILED,
	START_ENABLE_USER_BANK_CARD,
	ENABLE_USER_BANK_CARD_SUCCESS,
	ENABLE_USER_BANK_CARD_FAILED,
	START_DISABLE_USER_BANK_CARD,
	DISABLE_USER_BANK_CARD_SUCCESS,
	DISABLE_USER_BANK_CARD_FAILED,
} = actionTypes;

/* Example
data: List([
	{
		"id": 1,
		"bankName": "招商银行",
		"number": "1234566788959",
		"payer": "測試者",
		"activatedAt": "2020-01-13T10:37:46.000Z",
		"withdrawableAt": "2020-01-15T10:37:46.000Z",
		"status": 1
			// ACTIVE: 1
			// ARCHIVED: 2
			// BLOCKED: 3
	},
	...
]),
*/

const initialState = Map({
	data: List(),

	loadingStatus: NONE,
	loadingStatusMessage: '',
	createBankCardLoadingStatus: NONE,
	createBankCardLoadingStatusMessage: '',
	deleteBankCardLoadingStatus: NONE,
	deleteBankCardLoadingStatusMessage: '',
	enableBankCardWithdrawableLoadingStatus: NONE,
	enableBankCardWithdrawableLoadingStatusMessage: '',
	updateBankCardLoadingStatus: NONE,
	updateBankCardLoadingStatusMessage: '',
});

export default function bankCards(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_BANK_CARDS:
			return state.set('loadingStatus', LOADING);
		case FETCH_USER_BANK_CARDS_SUCCESS:
			return state
				.set('data', List(action.bankCards))
				.set('loadingStatus', SUCCESS);

		case FETCH_USER_BANK_CARDS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_CREATE_USER_BANK_CARD:
			return state.set('createBankCardLoadingStatus', LOADING);

		case CREATE_USER_BANK_CARD_SUCCESS: {
			const updatedData = state.get('data').unshift(action.bankCard);

			return state
				.set('data', updatedData)
				.set('createBankCardLoadingStatus', SUCCESS);
		}

		case CREATE_USER_BANK_CARD_FAILED:
			return state
				.set('createBankCardLoadingStatus', FAILED)
				.set('createBankCardLoadingStatusMessage', action.errorMessage);

		case START_DELETE_USER_BANK_CARD:
			return state.set('deleteBankCardLoadingStatus', LOADING);

		case DELETE_USER_BANK_CARD_SUCCESS: {
			const updatedData = state.get('data').filter((data) => data.id !== action.bankCardId);

			return state
				.set('data', updatedData)
				.set('deleteBankCardLoadingStatus', SUCCESS);
		}

		case DELETE_USER_BANK_CARD_FAILED:
			return state
				.set('deleteBankCardLoadingStatus', FAILED)
				.set('deleteBankCardLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_USER_BANK_CARD_WITHDRAWABLE:
			return state.set('enableBankCardWithdrawableLoadingStatus', LOADING);

		case ENABLE_USER_BANK_CARD_WITHDRAWABLE_SUCCESS: {
			const { bankCard, } = action;
			const updatedData = state.get('data').map(data => {
				return data.id === bankCard.id ? bankCard : data;
			});

			return state
				.set('data', updatedData)
				.set('enableBankCardWithdrawableLoadingStatus', SUCCESS);
		}

		case ENABLE_USER_BANK_CARD_WITHDRAWABLE_FAILED:
			return state
				.set('enableBankCardWithdrawableLoadingStatus', FAILED)
				.set('enableBankCardWithdrawableLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_BANK_CARD_NUMBER:
			return state.set('updateBankCardLoadingStatus', LOADING);
		case UPDATE_USER_BANK_CARD_UNMBER_SUCCESS: {
			const { bankCard, oldBankCardId, } = action;
			const updatedData = state.get('data').map(data => {
				if (data.id === oldBankCardId) {
					return bankCard;
				}
				return data;
			});

			return state
				.set('data', updatedData)
				.set('updateBankCardLoadingStatus', SUCCESS);
		}
		case UPDATE_USER_BANK_CARD_UNMBER_FAILED:
			return state
				.set('updateBankCardLoadingStatus', FAILED)
				.set('updateBankCardLoadingStatusMessage', action.errorMessage);
		case START_ENABLE_USER_BANK_CARD:
			return state.set('updateBankCardLoadingStatus', LOADING);
		case ENABLE_USER_BANK_CARD_SUCCESS: {
			const { bankCard } = action;
			const updatedData = state.get('data').map(data => {
				return data.id === bankCard.id ? bankCard : data;
			});

			return state
				.set('data', updatedData)
				.set('updateBankCardLoadingStatus', SUCCESS);
		}
		case ENABLE_USER_BANK_CARD_FAILED:
			return state
				.set('updateBankCardLoadingStatus', FAILED)
				.set('updateBankCardLoadingStatusMessage', action.errorMessage);
		case START_DISABLE_USER_BANK_CARD:
			return state.set('updateBankCardLoadingStatus', LOADING);
		case DISABLE_USER_BANK_CARD_SUCCESS: {
			const { bankCard } = action;
			const updatedData = state.get('data').map(data => {
				return data.id === bankCard.id ? bankCard : data;
			});

			return state
				.set('data', updatedData)
				.set('updateBankCardLoadingStatus', SUCCESS);
		}
		case DISABLE_USER_BANK_CARD_FAILED:
			return state
				.set('updateBankCardLoadingStatus', FAILED)
				.set('updateBankCardLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

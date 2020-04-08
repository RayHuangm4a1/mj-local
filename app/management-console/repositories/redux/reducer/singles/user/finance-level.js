import { Map, } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum, } from '../../../../../lib/enums';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;
const {
	START_FETCH_USER_FINANCE_LEVEL,
	FETCH_USER_FINANCE_LEVEL_SUCCESS,
	FETCH_USER_FINANCE_LEVEL_FAILED,
	START_UPDATE_USER_FINANCE_LEVEL,
	UPDATE_USER_FINANCE_LEVEL_SUCCESS,
	UPDATE_USER_FINANCE_LEVEL_FAILED,
} = actionTypes;

/* example
Map({
	data: Map({
		"id": 12,
		"username": "test01",
		"nickname": "测试零一",
		"levelId": 1,
		"levelExpiredAt": "9999-12-31",
		"wallets": [
			{
				"code": 100,
				"balance": 0
			}
		],
		"userStats": {
			"numOfDeposits": 0,
			"depositAmount": 0,
			"maxAmountPerDeposit": 0,
			"bettingAmount": 0,
			"bettingReward": 0,
			"numOfWithdraws": 0,
			"withdrawalAmount": 0,
			"damaAmount": 0
		}
	}),

	loadingStatus: NONE,
	loadingStatusMessage: '',
	updateLoadingStatus: NONE,
	updateLoadingStatusMessage: '',
})
*/

const initialState = Map({
	data: Map(),

	loadingStatus: NONE,
	loadingStatusMessage: '',
	updateLoadingStatus: NONE,
	updateLoadingStatusMessage: '',
});

export default function financeLevel(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_FINANCE_LEVEL:
			return state.set('loadingStatus', LOADING);
		case FETCH_USER_FINANCE_LEVEL_SUCCESS:
			return state
				.set('data', Map(action.financeLevel))
				.set('loadingStatus', SUCCESS);
		case FETCH_USER_FINANCE_LEVEL_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_FINANCE_LEVEL:
			return state.set('updateLoadingStatus', LOADING);
		case UPDATE_USER_FINANCE_LEVEL_SUCCESS:
			return state.set('updateLoadingStatus', SUCCESS);
		case UPDATE_USER_FINANCE_LEVEL_FAILED:
			return state
				.set('updateLoadingStatus', FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

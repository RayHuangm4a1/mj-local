import { Map, } from 'immutable';
import { keyBy, } from 'lodash';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const {
	START_FETCH_USER_WALLETS,
	FETCH_USER_WALLETS_SUCCESS,
	FETCH_USER_WALLETS_FAILED,
} = actionTypes;

/* example
data: Map({
	'<walletCode>': {
		"id": 23,
		"userId": 12,
		"username": "test01",
		"name": "彩票钱包",
		"type": 1,
		"code": 100,
		"balance": 10000,
		"isUsed": 1,
		"createdAt": "2020-02-10T10:21:28.000Z",
		"updatedAt": "2020-02-10T10:21:28.000Z"
	},
	'<walletCode>': {
		"id": 24,
		"userId": 12,
		"username": "test01",
		"name": "监管钱包",
		"type": 1,
		"code": 101,
		"balance": 10000,
		"isUsed": 0,
		"createdAt": "2020-02-10T10:21:28.000Z",
		"updatedAt": "2020-02-10T10:21:28.000Z"
	}
})
*/

const initialState = Map({
	data: Map(),
	
	loadingStatus: NONE,
	loadingStatusMessage: '',
});

export default function wallets(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_WALLETS:
			return state.set('loadingStatus', LOADING);
		case FETCH_USER_WALLETS_SUCCESS:
			return state
				.set('data', Map(keyBy(action.wallets, wallet => wallet.code)))
				.set('loadingStatus', SUCCESS);
		case FETCH_USER_WALLETS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

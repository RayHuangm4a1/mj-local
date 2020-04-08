import { List, Map, } from 'immutable';

import {
	START_FETCH_ZHAO_SHANG_ACCOUNTS,
	FETCH_ZHAO_SHANG_ACCOUNTS_SUCCESS,
	FETCH_ZHAO_SHANG_ACCOUNTS_FAILED,

	START_CREATE_ZHAO_SHANG_ACCOUNT,
	CREATE_ZHAO_SHANG_ACCOUNT_SUCCESS,
	CREATE_ZHAO_SHANG_ACCOUNT_FAILED,

} from '../../../../../controller/actions/action-types';

import { LoadingStatusEnum, } from '../../../../../lib/enums';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

/* DATA Example
data: Map({
	zhaoShangs: List([
		{
			"id": 1,
			"username": "mj-root",
			"nickname": "root",
			"deltaBonus": 0,
			"teamStats": {
				"depositAmount": 0,
				"withdrawalAmount": 0
			}
		},
		{
			"id": 11,
			"username": "zhaoshang01",
			"nickname": "zhaoshang01",
			"deltaBonus": 0,
			"teamStats": {
				"depositAmount": 0,
				"withdrawalAmount": 0
			}
		}
		...
	])
	numOfItems: 0,
	numOfPages: 1,
})
*/

const initialState = Map({
	data: Map({
		zhaoShangs: List(),
		numOfItems: 0,
		numOfPages: 1,
	}),
	fetchZhaoShangAccountsLoadingStatus: LoadingStatusEnum.NONE,
	fetchZhaoShangAccountsLoadingStatusMessage: '',

	createZhaoShangAccountLoadingStatus: NONE,
	createZhaoShangAccountLoadingStatusMessage: '',
});

export default function zhaoShangAccountPage(state = initialState, action) {
	switch (action.type) {
		// Fetch account
		case START_FETCH_ZHAO_SHANG_ACCOUNTS:
			return state.set('fetchZhaoShangAccountsLoadingStatus', LOADING);

		case FETCH_ZHAO_SHANG_ACCOUNTS_SUCCESS: {
			const {
				data,
				numOfItems,
				numOfPages,
			} = action;

			return state
				.setIn(['data', 'zhaoShangs'], List(data.zhaoshangs))
				.setIn(['data', 'numOfItems'], numOfItems)
				.setIn(['data', 'numOfPages'], numOfPages)
				.set('fetchZhaoShangAccountsLoadingStatus', SUCCESS);
		}
		case FETCH_ZHAO_SHANG_ACCOUNTS_FAILED:
			return state
				.set('fetchZhaoShangAccountsLoadingStatus', FAILED)
				.set('fetchZhaoShangAccountsLoadingStatusMessage', action.errorMessage);

		// Create
		case START_CREATE_ZHAO_SHANG_ACCOUNT:
			return state.set('createZhaoShangAccountLoadingStatus', LOADING);

		case CREATE_ZHAO_SHANG_ACCOUNT_SUCCESS:
			return state.set('createZhaoShangAccountLoadingStatus', SUCCESS);

		case CREATE_ZHAO_SHANG_ACCOUNT_FAILED: {
			return state
				.set('createZhaoShangAccountLoadingStatus', FAILED)
				.set('createZhaoShangAccountLoadingStatusMessage', action.errorMessage);
		}

		default:
			return state;
	}
}

import { Map } from 'immutable';
import { actionTypes, } from "../../../../../controller";
import { LoadingStatusEnum, } from "../../../../../lib/enums";

const {
	START_FETCH_FINANCE_LEVEL_USERS,
	FETCH_FINANCE_LEVEL_USERS_SUCCESS,
	FETCH_FINANCE_LEVEL_USERS_FAILED,
} = actionTypes;

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

/* example
Map({
	users: [
		{
			id: 1,
			username: "mj-root",
			loginAt: null,
			wallets: [
				{
					balance: 0
				}
			]
		},
		...
	],
	numOfItems: 0,
	numOfPages: 0,
})
*/

const initialState = Map({
	data: Map({
		users: [],
		numOfItems: 0,
		numOfPages: 0,
	}),

	loadingStatus: NONE,
	loadingStatusMessage: '',
});

export default function financeLevelUsers(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_FINANCE_LEVEL_USERS:
			return state.set('loadingStatus', LOADING);

		case FETCH_FINANCE_LEVEL_USERS_SUCCESS: {
			const {
				data,
				numOfItems,
				numOfPages,
			} = action;

			return state
				.set('data', Map({
					users: data,
					numOfItems,
					numOfPages,
				}))
				.set('loadingStatus', SUCCESS);
		}

		case FETCH_FINANCE_LEVEL_USERS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

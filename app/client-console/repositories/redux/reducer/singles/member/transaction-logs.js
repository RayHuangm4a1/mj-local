import { Map, } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_TRANSACTION_LOGS,
	FETCH_TRANSACTION_LOGS_SUCCESS,
	FETCH_TRANSACTION_LOGS_FAILED,
} = actionTypes;

/* Example
data: Map({
	transactionLogs: [
		{
			id: 1,
			userId: 22,
			associateId: 1,
			type: 1,
			walletCode: 100,
			amount: 10,
			balance: 100,
			description: "返回自身工資"
			createdAt: '2019-10-21T05:40:02.000Z'
		},
		...
	],
	page: 1,
	numOfItems: 7,
	numOfPages: 1,
}),
*/

const initialState = Map({
	data: Map({
		transactionLogs: [],
		page: 1,
		numOfItems: 0,
		numOfPages: 0,
	}),
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function transactionLogs(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_TRANSACTION_LOGS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_TRANSACTION_LOGS_SUCCESS: {
			const {
				data,
				numOfItems,
				numOfPages,
				page,
			} = action;

			return state
				.set('data', Map({
					transactionLogs: data,
					numOfItems,
					numOfPages,
					page,
				}))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_TRANSACTION_LOGS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

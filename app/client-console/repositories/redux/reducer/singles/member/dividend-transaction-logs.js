import { Map, } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_DIVIDEND_TRANSACTION_LOGS,
	FETCH_DIVIDEND_TRANSACTION_LOGS_SUCCESS,
	FETCH_DIVIDEND_TRANSACTION_LOGS_FAILED,
} = actionTypes;

/* Example
{
	data: Map({
		dividendTransactionLogs: [
			{
				id: 1,
				userId: 22,
				associateId: 1,
				// type: '13,15'|'17'
				type: 1,
				walletCode: 100,
				amount: 10,
				balance: 100,
				description: "转入彩票钱包"
				createdAt: '2019-10-21T05:40:02.000Z'
			},
		],

		page: 1,
		numOfItems: 7,
	}),
	limit: 10,
	loadingStatus: 0,
	loadingStatusMessage: '',
}
*/

const DEFAULT_PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;

const initialState = Map({
	data: Map({
		dividendTransactionLogs: [],
		page: DEFAULT_PAGE,
		numOfItems: 0,
	}),
	limit: DEFAULT_PAGE_LIMIT,
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function dividendTransactionLogs(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_DIVIDEND_TRANSACTION_LOGS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_DIVIDEND_TRANSACTION_LOGS_SUCCESS: {
			const {
				data,
				numOfItems,
				page,
			} = action;

			return state
				.set('data', Map({
					dividendTransactionLogs: data,
					numOfItems,
					page,
				}))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_DIVIDEND_TRANSACTION_LOGS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

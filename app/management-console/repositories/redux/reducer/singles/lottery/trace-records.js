import { List, Map } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_TRACE_RECORDS,
	FETCH_TRACE_RECORDS_SUCCESS,
	FETCH_BETTING_RECORDS_FAILED,
} = actionTypes;

/* Example
{
	data: Map({
		traceRecords: [
			{
				id: 1,
				userId: 12,
				username: "test01",
				lotteryClassId: 0,
				lotteryId: 16,
				lotteryName: "腾讯分分彩",
				playId: 53007,
				name: "整合 3",
				isTerminatedIfWin: true,       // 中獎後停止
				isTerminatedIfNotOpened: true, // 中斷後停止
				totalIssues: 3,                // 總共追號期數
				totalFinishedIssues: 2,        // 全部完成幾期
				rebate: 3,
				amountPerBet: 0.2,
				count: 1,
				amount: 0.2,
				betcontent: "3",
				weizhi: "",
				isPK: 0,
				status: "new",
				device: "unknown", // unknown,website,android,ios
				closedAt: Date,
				createdAt: Date,
				updatedAt: Date
			},
			// ....
		],
		page: 1,
		numOfItems: 0,
		numOfPages: 1,
	}),
	loadingStatus: 0,
	loadingStatusMessage: '',
	discardLoadingStatus: 0,
	discardLoadingStatusMessage: '',
}
*/

const initialState = Map({
	data: Map({
		traceRecords: List(),
		page: 1,
		numOfItems: 0,
		numOfPages: 1,
	}),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: "",
});

export default function traceRecords(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_TRACE_RECORDS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_TRACE_RECORDS_SUCCESS: {
			const {
				traceRecords,
				page,
				numOfItems,
				numOfPages,
			} = action;

			return state
				.setIn(['data', 'traceRecords'], List(traceRecords))
				.setIn(['data', 'page'], page)
				.setIn(['data', 'numOfItems'], numOfItems)
				.setIn(['data', 'numOfPages'], numOfPages)
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_BETTING_RECORDS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

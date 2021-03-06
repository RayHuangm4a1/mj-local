import { List, Map } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_TRACE_RECORD_BETTINGS,
	FETCH_TRACE_RECORD_BETTINGS_SUCCESS,
	FETCH_BETTING_RECORD_BETTINGS_FAILED,
} = actionTypes;

/* Example
{
	data: Map({
		traceBettings: [
			id: 1,
			userId: 12,
			username: "test01",
			walletCode: "primary",
			type: 2,
			traceId: 0,
			lotteryClassId: 0,
			lotteryId: 16,
			lotteryName: "腾讯分分彩",
			playId: 53007,
			unit: 1,
			awards: {
				3: {
					numerator: 1,
					deltaBonus: 0,
					denominator: 10
				}
			},
			name: "整合 3",
			bonus: 1956,
			rebate: 3,
			issue: "20190918-0864",
			opencode: null,
			reward: 0,
			amountPerBet: 0.2,
			multiple: 1,
			count: 1,
			amount: 0.2,
			betcontent: "3",
			weizhi: "",
			isPK: 0,
			status: "new",
			details: [],
			device: "unknown",
			error: null,
			oid: 0,
			pid: 1,
			closedAt: "2019-09-18T06:23:58.000Z",
			createdAt: "2019-09-18T06:22:59.000Z",
			updatedAt: "2019-09-18T06:22:59.000Z"
			// .... 少了期號，獎金，取消期數，取消金額
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
		traceBettings: List(),
		numOfItems: 0,
		numOfPages: 1,
		page: 1,
	}),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: "",
	discardLoadingStatus: LoadingStatusEnum.NONE,
	discardLoadingStatusMessage: '',
});

export default function traceRecords(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_TRACE_RECORD_BETTINGS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_TRACE_RECORD_BETTINGS_SUCCESS: {
			const {
				traceBettings,
				page,
				numOfItems,
				numOfPages,
			} = action;

			return state
				.setIn(['data', 'traceBettings'], List(traceBettings))
				.setIn(['data', 'page'], page)
				.setIn(['data', 'numOfItems'], numOfItems)
				.setIn(['data', 'numOfPages'], numOfPages)
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_BETTING_RECORD_BETTINGS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

import { List, Map } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_BETTING_RECORDS,
	FETCH_BETTING_RECORDS_SUCCESS,
	FETCH_BETTING_RECORDS_FAILED,
} = actionTypes;

/* Example
{
  data: Map(
		bettingRecords: [
	    {
			id: 1,
			userId: 1,
			username: 'test01',
			walletId: 23,
			type: 1, // 1: 一般投注, 2：追號投注
			traceId: 0, // 0：非追號，other：追號id
			lotteryClassId: 1,
			lotteryId: 0,
			lotteryName: '腾讯分分彩',
			playId: 1,
			unit: 2,
			awards: {
				小: {
					deltaBonus: 0,
					numerator: 1,
					denominator: 2
				}
			},
			name: "整合 小",
			bonus: 1956,
			rebate: 0,
			issue: "20190827-442",
			opencode: "",
			reward: 0,
			amountPerBet: 10,
			multiple: 2,
			count: 1,
			amount: 1,
			betcontent: "小",
			weizhi: "",
			isPK: false, // ture/false
			status: 2, // NEW: 1,WIN: 2, LOSE: 3, DRAW: 4, FAILED: 5, CANCELED: 6, EXPIRED: 7, NOT_OPENED: 8, OPENING: 9,
			details: [ // 中獎資訊
				{
					name: "和",
					count: 1,
					reward: 10
				}
			],
			device: "unknown",
			oid: 0,
			createdAt: Date,
			updatedAt: Date
		},
			// ....
		],

		page: 1,
		numOfItems: 42,
		numOfPages: 5,
	}),

	loadingStatus: 0,
	loadingStatusMessage: '',
}
*/

const initialState = Map({
	data: Map({
		bettingRecords: List(),
		numOfItems: 0,
		numOfPages: 1,
		page: 1,
	}),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: "",
});

export default function bettingRecords(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_BETTING_RECORDS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_BETTING_RECORDS_SUCCESS: {
			const {
				data,
				numOfItems,
				numOfPages,
				page,
			} = action;

			return state
				.setIn(['data', 'bettingRecords'], List(data))
				.setIn(['data', 'page'], page)
				.setIn(['data', 'numOfItems'], numOfItems)
				.setIn(['data', 'numOfPages'], numOfPages)
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_BETTING_RECORDS_FAILED:
			return state
				.set('data', initialState.get('data'))
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

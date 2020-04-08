import { Map, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_FETCH_BETTING_RECORD_DETAIL,
	FETCH_BETTING_RECORD_DETAIL_SUCESS,
	FETCH_BETTING_RECORD_DETAIL_FAILED,
	RESET_BETTING_RECORDS_DETAILS,
} = actionTypes;

const {
	LOADING,
	SUCCESS,
	FAILED,
	NONE,
} = LoadingStatusEnum;

/* Example
data:Map({
	12312: {
		id: 12312,
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
		status: "new", // "new", "win", "lose", "draw", "failed", "canceled", "expired"
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
}),
*/

const initialState = Map({
	data: Map(),
	loadingStatus: NONE,
	loadingStatusMessage: '',
});

export default function bettingRecordDetails(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_BETTING_RECORD_DETAIL:
			return state.set('loadingStatus', LOADING);
		case FETCH_BETTING_RECORD_DETAIL_SUCESS: {
			const { bettingRecord = {} } = action;
			const data = Object.assign(bettingRecord, {
				isPK: Boolean(bettingRecord.isPK),
			});

			return state
				.setIn(['data', `${data.id}`], data)
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_BETTING_RECORD_DETAIL_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case RESET_BETTING_RECORDS_DETAILS:
			return initialState;
		default:
			return state;
	}
}

import { Map, List, } from 'immutable';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

const {
	START_FETCH_TEAM_TRACE_RECORD_DETAIL,
	FETCH_TEAM_TRACE_RECORD_DETAIL_SUCCESS,
	FETCH_TEAM_TRACE_RECORD_DETAIL_FAILED,
	START_FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS,
	FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS_SUCCESS,
	FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS_FAILED,
} = actionTypes;

// TODO 確認資料結構
/* Example
{
	data: Map({
		id: 2,
		username: "test01",
		lotteryName: "东京1.5分彩",
		name: "定位胆 定位胆",
		isTerminatedIfWin: 1,
		numOfIssues: 3,
		numOfFinishedIssues: 0,
		rebate: 1,
		amountPerBet: 1,
		amount: 35,
		betcontent: "1,1,1,1,1",
		weizhi: "",
		status: 1,
		device: "unknown",
		createdAt: "2019-10-22T03:54:33.000Z"
	})

	bettings: Map({
		data: [
			{
				id: 13,
				issue: "20191022-477",
				opencode: null,
				reward: 0,
				multiple: 1,
				amount: 5,
				status: 1,
				details: []
			},
			...
		],
		numOfItems: 3,
		numOfPages: 1
	})
}
*/

const initialState = Map({
	data: Map(),
	bettings: Map(),

	teamTraceRecordDetailLoadingStatus: NONE,
	teamTraceRecordDetailLoadingStatusMessage: '',

	teamTraceRecordDetailBettingsLoadingStatus: NONE,
	teamTraceRecordDetailBettingsLoadingStatusMessage: '',
});

export default function teamTraceRecordDetail(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_TEAM_TRACE_RECORD_DETAIL:
			return state.set('teamTraceRecordDetailLoadingStatus', LOADING);
		case FETCH_TEAM_TRACE_RECORD_DETAIL_SUCCESS:
			return state
				.set('data', Map(action.teamTraceRecordDetail))
				.set('teamTraceRecordDetailLoadingStatus', SUCCESS);
		case FETCH_TEAM_TRACE_RECORD_DETAIL_FAILED:
			return state
				.set('teamTraceRecordDetailLoadingStatus', FAILED)
				.set('teamTraceRecordDetailLoadingStatusMessage', action.errorMessage);

		case START_FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS:
			return state.set('teamTraceRecordDetailBettingsLoadingStatus', LOADING);
		case FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS_SUCCESS:
			return state
				.set('bettings', Map(action.teamTraceRecordDetailBettings))
				.set('teamTraceRecordDetailBettingsLoadingStatus', SUCCESS);
		case FETCH_TEAM_TRACE_RECORD_DETAIL_BETTINGS_FAILED:
			return state
				.set('teamTraceRecordDetailBettingsLoadingStatus', FAILED)
				.set('teamTraceRecordDetailBettingsLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

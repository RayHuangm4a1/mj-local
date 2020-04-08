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
	START_FETCH_TEAM_TRACE_RECORDS,
	FETCH_TEAM_TRACE_RECORDS_SUCCESS,
	FETCH_TEAM_TRACE_RECORDS_FAILED,
} = actionTypes;

// TODO 確認資料結構
/* Example
{
	data: Map({
		traceRecords: List([
			{
				"id": 1,
				"username": "test01",
				"lotteryName": "东京1.5分彩",
				"name": "定位胆 定位胆",
				"isTerminatedIfWin": 1,
				"numOfIssues": 3,
				"numOfFinishedIssues": 0,
				"count": 5,
				"amount": 35,
				"status": 1,
				"createdAt": "2019-10-23T06:50:46.000Z",
			},
			...
		])
		numOfItems: 9,
		numOfPages: 1,
	})
}
*/

const initialState = Map({
	data: Map({
		traceRecords: List(),
		numOfItems: 0,
		numOfPages: 1,
	}),

	teamTraceRecordsLoadingStatus: NONE,
	teamTraceRecordsLoadingStatusMessage: '',
});

export default function teamTraceRecords(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_TEAM_TRACE_RECORDS:
			return state.set('teamTraceRecordsLoadingStatus', LOADING);
		case FETCH_TEAM_TRACE_RECORDS_SUCCESS:
			return state
				.setIn(['data', 'traceRecords'], List(action.teamTraceRecords))
				.setIn(['data', 'numOfItems'], action.numOfItems)
				.setIn(['data', 'numOfPages'], action.numOfPages)
				.set('teamTraceRecordsLoadingStatus', SUCCESS);
		case FETCH_TEAM_TRACE_RECORDS_FAILED:
			return state
				.set('teamTraceRecordsLoadingStatus', FAILED)
				.set('teamTraceRecordsLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

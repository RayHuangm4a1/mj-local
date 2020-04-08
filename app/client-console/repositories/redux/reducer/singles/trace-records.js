import { Map, List, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_FETCH_TRACE_RECORDS,
	FETCH_TRACE_RECORDS_SUCCESS,
	FETCH_TRACE_RECORDS_FAILED,
	START_FETCH_TRACE_RECORD,
	FETCH_TRACE_RECORD_SUCCESS,
	FETCH_TRACE_RECORD_FAILED,
	SET_SELECTED_TRACE_RECORD,
	PREPEND_LATEST_TRACE_RECORDS,
	START_FETCH_LATEST_TRACE_RECORDS,
	FETCH_LATEST_TRACE_RECORDS_SUCCESS,
	FETCH_LATEST_TRACE_RECORDS_FAILED,
} = actionTypes;

/* Example
{
	data: Map({
		traceRecords: List([
			{
				"id": 1,
				"userId": 12,
				"username": "test01",
				"lotteryClassId": 0,
				"lotteryId": 12,
				"lotteryName": "东京1.5分彩",
				"playId": 79,
				"name": "定位胆 定位胆",
				"isTerminatedIfWin": 1,
				"numOfIssues": 3,
				"numOfFinishedIssues": 0,
				"rebate": 1,
				"amountPerBet": 1,
				"count": 5,
				"amount": 35,
				"betcontent": "1,1,1,1,1",
				"weizhi": "",
				"isPK": 0,
				"status": 1,
				"device": "unknown",
				"oid": 0,
				"pid": 2,
				"createdAt": "2019-10-23T06:50:46.000Z",
				"updatedAt": "2019-10-23T06:50:46.000Z"
			},
			...
		]),
		numOfItems: 9,
		numOfPages: 1,
	}),
	latestTraceRecordsData: List(
		// ...traceRecord
	),
},
*/

const initialState = Map({
	data: Map({
		traceRecords: List(),
		page: 1,
		numOfItems: 0,
		numOfPages: 0,
	}),
	selectedTraceRecord: Map(),
	latestTraceRecordsData: List(),
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
	traceRecordLoadingStatus: LoadingStatusEnum.NONE,
	traceRecordLoadingStatusMessage: '',
	latestTraceRecordsLoadingStatus: LoadingStatusEnum.NONE,
	latestTraceRecordsloadingStatusMessage: '',
});

export default function traceRecords(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_TRACE_RECORDS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_TRACE_RECORDS_SUCCESS: {
			const {
				data,
				numOfItems,
				numOfPages,
				page,
			} = action;
			const traceRecords = data.map(traceRecord => {
				return Object.assign(traceRecord, {
					isPK: Boolean(traceRecord.isPK),
					isTerminatedIfWin: Boolean(traceRecord.isTerminatedIfWin),
				});
			});

			return state
				.setIn(['data', 'traceRecords'], List(traceRecords))
				.setIn(['data', 'numOfItems'], numOfItems)
				.setIn(['data', 'numOfPages'], numOfPages)
				.setIn(['data', 'page'], page)
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_TRACE_RECORDS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case SET_SELECTED_TRACE_RECORD: {
			const { selectedTraceRecord, } = action;

			return state.set('selectedTraceRecord', Map(selectedTraceRecord));
		}
		case START_FETCH_TRACE_RECORD:
			return state.set('traceRecordLoadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_TRACE_RECORD_SUCCESS: {
			const { traceRecord: rawRecord, } = action;
			const isPK = Boolean(rawRecord.isPK);
			const isTerminatedIfWin = Boolean(rawRecord.isTerminatedIfWin);
			const updatedTraceRecord = {
				...rawRecord,
				isPK,
				isTerminatedIfWin,
			};
			const updateTraceRecord = (records) => {
				const index = records.findIndex(record => record.id === updatedTraceRecord.id);

				if (index !== -1) {
					return records.set(index, updatedTraceRecord);
				} else {
					return records;
				}
			};
			const updateSelectedTraceRecord = (record) => {
				if (record.get('id') === updatedTraceRecord.id) {
					return Map(updatedTraceRecord);
				}
				return record;
			};

			return state
				.updateIn(['data', 'traceRecords'], updateTraceRecord)
				.updateIn(['latestTraceRecordsData'], updateTraceRecord)
				.update('selectedTraceRecord', updateSelectedTraceRecord)
				.set('traceRecordLoadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_TRACE_RECORD_FAILED:
			return state
				.set('traceRecordLoadingStatus', LoadingStatusEnum.FAILED)
				.set('traceRecordLoadingStatusMessage', action.errorMessage);
		case PREPEND_LATEST_TRACE_RECORDS: {
			const updatedTraceRecords = List(action.traceRecords.sort(compareDateDescending('createdAt')))
				.concat(state.get('latestTraceRecordsData'))
				.slice(0, 10);

			return state
				.set('latestTraceRecordsData', updatedTraceRecords);
		}
		case START_FETCH_LATEST_TRACE_RECORDS:
			return state.set('latestTraceRecordsLoadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_LATEST_TRACE_RECORDS_SUCCESS: {
			const { data, } = action;
			const traceRecords = data.map(traceRecord => {
				return Object.assign(traceRecord, {
					isPK: Boolean(traceRecord.isPK),
					isTerminatedIfWin: Boolean(traceRecord.isTerminatedIfWin),
				});
			});

			return state
				.set('latestTraceRecordsData', List(traceRecords))
				.set('latestTraceRecordsLoadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_LATEST_TRACE_RECORDS_FAILED:
			return state
				.set('latestTraceRecordsLoadingStatus', LoadingStatusEnum.FAILED)
				.set('latestTraceRecordsloadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

function compareDateDescending(date) {
	return (record1, record2) => new Date(record2[date]) - new Date(record1[date]);
}

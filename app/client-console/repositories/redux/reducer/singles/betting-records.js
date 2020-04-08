import { Map, List, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_FETCH_BETTING_RECORDS,
	FETCH_BETTING_RECORDS_SUCCESS,
	FETCH_BETTING_RECORDS_FAILED,
	START_DISCARD_BETTING_RECORD,
	DISCARD_BETTING_RECORD_SUCCESS,
	DISCARD_BETTING_RECORD_FAILED,
	PREPEND_BETTING_RECORDS,
	START_FETCH_LATEST_BETTING_RECORDS,
	FETCH_LATEST_BETTING_RECORDS_SUCCESS,
	FETCH_LATEST_BETTING_RECORDS_FAILED,
} = actionTypes;

const {
	LOADING,
	SUCCESS,
	FAILED,
	NONE,
} = LoadingStatusEnum;


/* Example
data:Map({
	bettingRecords: List([
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
	},
		// ....
	]),

	page: 1,
	numOfItems: 0,
	numOfPages: 1,
}),
latestBettingRecordsData: List(
	// ...bettingRecord
),
*/

const initialState = Map({
	data: Map({
		bettingRecords: List(),
		page: 1,
		numOfItems: 0,
		numOfPages: 0,
	}),
	latestBettingRecordsData: List(),
	loadingStatus: NONE,
	loadingStatusMessage: '',
	discardLoadingStatus: NONE,
	discardLoadingStatusMessage: '',
	latestBettingRecordsLoadingStatus: NONE,
	latestBettingRecordsloadingStatusMessage: '',
});

export default function bettingRecords(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_BETTING_RECORDS:
			return state.set('loadingStatus', LOADING);
		case FETCH_BETTING_RECORDS_SUCCESS: {
			const {
				data,
				numOfItems,
				numOfPages,
				page,
			} = action;
			const bettingRecords = data.map(bettingRecord => {
				return Object.assign(bettingRecord, {
					isPK: Boolean(bettingRecord.isPK),
				});
			});

			return state
				.setIn(['data', 'bettingRecords'], List(bettingRecords))
				.setIn(['data', 'numOfItems'], numOfItems)
				.setIn(['data', 'numOfPages'], numOfPages)
				.setIn(['data', 'page'], page)
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_BETTING_RECORDS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case START_DISCARD_BETTING_RECORD:
			return state.set('discardLoadingStatus', LOADING);
		case DISCARD_BETTING_RECORD_SUCCESS: {
			const { payload, } = action;
			const updatedBettingRecords = state.getIn(['data', 'bettingRecords'])
				.map(item => {
					if (item.id === payload.id) {
						return Object.assign(payload, {
							isPK: Boolean(payload.isPK),
						});
					}
					return item;
				});
			const updatedLatestBettingRecords = state.get('latestBettingRecordsData')
				.map(item => {
					if (item.id === payload.id) {
						return Object.assign(payload, {
							isPK: Boolean(payload.isPK),
						});
					}
					return item;
				});

			return state
				.setIn(['data', 'bettingRecords'], updatedBettingRecords)
				.set('latestBettingRecordsData', updatedLatestBettingRecords)
				.set('discardLoadingStatus', SUCCESS);
		}
		case DISCARD_BETTING_RECORD_FAILED:
			return state
				.set('discardLoadingStatus', FAILED)
				.set('discardLoadingStatusMessage', action.errorMessage);
		case PREPEND_BETTING_RECORDS: {
			const updatedBettingRecords = List(action.results.reverse())
				.concat(state.get('latestBettingRecordsData'))
				.slice(0, 10);

			return state
				.set('latestBettingRecordsData', updatedBettingRecords);
		}
		case START_FETCH_LATEST_BETTING_RECORDS:
			return state.set('latestBettingRecordsLoadingStatus', LOADING);
		case FETCH_LATEST_BETTING_RECORDS_SUCCESS: {
			const { data, } = action;
			const bettingRecords = data.map(bettingRecord => {
				return Object.assign(bettingRecord, {
					isPK: Boolean(bettingRecord.isPK),
				});
			});

			return state
				.set('latestBettingRecordsData', List(bettingRecords))
				.set('latestBettingRecordsLoadingStatus', SUCCESS);
		}
		case FETCH_LATEST_BETTING_RECORDS_FAILED:
			return state
				.set('latestBettingRecordsLoadingStatus', FAILED)
				.set('latestBettingRecordsloadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

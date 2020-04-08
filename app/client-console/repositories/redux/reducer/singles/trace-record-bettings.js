import { Map, List, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_FETCH_TRACE_RECORD_BETTINGS,
	FETCH_TRACE_RECORD_BETTINGS_SUCCESS,
	FETCH_TRACE_RECORD_BETTINGS_FAILED,
	START_DISCARD_TRACE_RECORD_BETTINGS,
	DISCARD_TRACE_RECORD_BETTINGS_SUCCESS,
	DISCARD_TRACE_RECORD_BETTINGS_FAILED,
} = actionTypes;

/* Example
{
	data: Map({
		"traceRecordBettings": [
			{
				"id": 13,
				"issue": "20191022-477",
				"opencode": null,
				"reward": 0,
				"multiple": 1,
				"amount": 5,
				"status": 1,
				"details": []
			},
			...
		],
		"numOfItems": 3,
		"numOfPages": 1
	}),
},
*/

const initialState = Map({
	data: Map({
		traceRecordBettings: List(),
		page: 1,
		numOfItems: 0,
		numOfPages: 0,
	}),
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
	discardLoadingStatus: LoadingStatusEnum.NONE,
	discardLoadingStatusMessage: '',
});

export default function traceRecordBettings(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_TRACE_RECORD_BETTINGS:
			return state.set('bettingLoadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_TRACE_RECORD_BETTINGS_SUCCESS: {
			const {
				data,
				numOfItems,
				numOfPages,
				page,
			} = action;
			const traceRecordBettings = data.map(traceRecordBetting => {
				return Object.assign(traceRecordBetting, {
					isPK: Boolean(traceRecordBetting.isPK),
				});
			});

			return state
				.setIn(['data', 'traceRecordBettings'], List(traceRecordBettings))
				.setIn(['data', 'numOfItems'], numOfItems)
				.setIn(['data', 'numOfPages'], numOfPages)
				.setIn(['data', 'page'], page)
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_TRACE_RECORD_BETTINGS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case START_DISCARD_TRACE_RECORD_BETTINGS:
			return state.set('discardLoadingStatus', LoadingStatusEnum.LOADING);
		case DISCARD_TRACE_RECORD_BETTINGS_SUCCESS: {
			const { discardedTraceRecordBettings, } = action;
			const traceRecordBettings = discardedTraceRecordBettings.map(
				(betting) => Object.assign(betting, { isPK: Boolean(betting.isPK), })
			);
			const discardIds = traceRecordBettings.map(item => item.id);
			const updatedTraceRecords = state.getIn(['data', 'traceRecordBettings'])
				.map(item => {
					const index = discardIds.indexOf(item.id);

					if (index >= 0) {
						return traceRecordBettings[index];
					}
					return item;
				});

			return state
				.setIn(['data', 'traceRecordBettings'], updatedTraceRecords)
				.set('discardLoadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case DISCARD_TRACE_RECORD_BETTINGS_FAILED:
			return state
				.set('discardLoadingStatus', LoadingStatusEnum.FAILED)
				.set('discardLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

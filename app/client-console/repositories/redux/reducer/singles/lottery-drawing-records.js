import { List, Map, } from 'immutable';
import { LoadingStatusEnum, } from "../../../../lib/enums";
import { actionTypes, } from '../../../../controller';

const {
	START_FETCH_LOTTERY_DRAWING_RECORDS,
	FETCH_LOTTERY_DRAWING_RECORDS_SUCCESS,
	FETCH_LOTTERY_DRAWING_RECORDS_FAILED,
	PREPEND_LOTTERY_DRAWING_RECORD,
	CLEAR_LOTTERY_DRAWING_RECORDS,
} = actionTypes;

/* Example
{
	data: List([
			{
				id: 1,
				status: 2,
				// REWARD_GRANTING: 1,
				// REWARD_GRANTED: 2,
				// TEAM_COMMISSION_GRANTED: 3,
				// CANCELD: 5,
				// MODIFIED: 6,
				// DUPLICATED: 7,
				// EARLY_OPENED: 8,
				issue: "20190722-1098",
				index: "1098",
				opencode: "1,7,0,1,7",
				openedAt: "2019-07-22T10:18:00.000Z",
				nextOpenedAt: "2019-07-22T10:19:00.000Z",
				missing: {
					万: {
						0: 4,
						1: 0,
						2: 1,
						3: 9,
						4: 5,
						5: 12,
						6: 3,
						7: 6,
						8: 2,
						9: 10
					},
					千: {
						0: 27,
						1: 11,
						2: 2,
						3: 7,
						4: 20,
						5: 1,
						6: 3,
						7: 0,
						8: 4,
						9: 18
					},
					百: {
						0: 0,
						1: 13,
						2: 1,
						3: 3,
						4: 6,
						5: 15,
						6: 9,
						7: 7,
						8: 48,
						9: 17
					},
					十: {
						0: 13,
						1: 0,
						2: 3,
						3: 10,
						4: 5,
						5: 6,
						6: 16,
						7: 22,
						8: 9,
						9: 1
					},
					个: {
						0: 13,
						1: 5,
						2: 26,
						3: 1,
						4: 3,
						5: 7,
						6: 4,
						7: 0,
						8: 15,
						9: 2
					},
				},
				lotteryId: 16,
				createdAt: "2019-07-22T10:18:10.103Z",
				updatedAt: "2019-07-22T10:18:10.103Z",
			},
			// ...
		]),
	loadingStatus: '',
	loadingStatusMessage: '',
}
*/


const initialState = Map({
	data: List(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingMessage: '',
});

export default function lotteryDrawingRecords(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_LOTTERY_DRAWING_RECORDS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_LOTTERY_DRAWING_RECORDS_SUCCESS:
			return state
				.set('loadingStatus', LoadingStatusEnum.SUCCESS)
				.set('data', List(action.lotteryDrawingRecords));
		case FETCH_LOTTERY_DRAWING_RECORDS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingMessage', action.errorMessage);
		case PREPEND_LOTTERY_DRAWING_RECORD:
			return state
				.set('data', state.get('data').insert(0, action.lotteryDrawingRecord));
		case CLEAR_LOTTERY_DRAWING_RECORDS:
			return state
				.set('data', List());
		default:
			return state;
	}
}

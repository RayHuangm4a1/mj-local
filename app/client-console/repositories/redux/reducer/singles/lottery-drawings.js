import { Map } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_FETCH_LOTTERY_DRAWINGS,
	FETCH_LOTTERY_DRAWINGS_SUCCESS,
	FETCH_LOTTERY_DRAWINGS_FAILED,
} = actionTypes;

/* Example
data:
Map({
	'<lotteryId>': {
		// 當期drawing
		'current': {
			_id: "5d1463b21771ae0cee0e14af",
			status: "opening",
			issue: "20190627-0876",
			index: "0876",
			opencode: null,
			closedAt: "2019-06-27T06:35:00.000Z",
			openedAt: "2019-06-27T06:35:00.000Z",
			createdAt: "2019-06-27T06:35:30.178Z",
			updatedAt: "2019-06-27T06:35:30.178Z"
		},
		// 上期drawing
		'previous': {
			_id: "5d1463b21771ae0cee0e14af",
			status: "opened",
			issue: "20190627-0875",
			index: "0875",
			opencode: "1,5,4,5,6",
			closedAt: "2019-06-27T06:35:00.000Z",
			openedAt: "2019-06-27T06:35:00.000Z",
			createdAt: "2019-06-27T06:35:30.178Z",
			updatedAt: "2019-06-27T06:35:30.178Z"
		},
	},
}),
*/

const initialState = Map({
	data: Map(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function drawings(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_LOTTERY_DRAWINGS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_LOTTERY_DRAWINGS_SUCCESS: {
			const {
				lotteryId,
				drawings,
			} = action;

			return state
				.setIn(['data', lotteryId], {
					current: drawings[0],
					previous: drawings[1],
				})
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_LOTTERY_DRAWINGS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

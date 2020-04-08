import { Map, List } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
const {
	START_FETCH_LOTTERY_DRAWINGS,
	FETCH_LOTTERY_DRAWINGS_SUCCESS,
	FETCH_LOTTERY_DRAWINGS_FAILED,
	START_STOP_LOTTERY_DRAWING,
	STOP_LOTTERY_DRAWING_SUCCESS,
	STOP_LOTTERY_DRAWING_FAILED,
} = actionTypes;

/*
lotteryDrawings:
{
	data: Map({
		drawings: [
			{
				_id: "5d358d6287fe99001aaffb41",
				status: "opened",
					// 開獎狀態：
					// opening - 開盤
					// new - 開獎中
					// rewarding - 頒獎中
					// rewarded - 已頒獎 - 可以被修改
					// canceled - 已取消
					// modified - 已修改 - 可以被修改
					// archived
					// 其餘狀態都不能修改開獎號碼
				issue: "20190722-1098",
				index: "1098",
				opencode: "1,7,0,1,7",
				openedAt: "2019-07-22T10:18:00.000Z",
				missing: {
					'万': {
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
					'千': {
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
					'百': {
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
					'十': {
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
					'个': {
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
					}
				},
				createdAt: "2019-07-22T10:18:10.103Z",
				updatedAt: "2019-07-22T10:18:10.103Z"
			},
			// ...
		],
	}),
	loadingStatus: '',
	loadingStatusMessage: '',
}
*/

const initialState = Map({
	drawings: List(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
	stopLotteryDrawingLoadingStatus: LoadingStatusEnum.NONE,
	stopLotteryDrawingLoadingStatusMessage: '',
});

export default function lotteryDrawings(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_LOTTERY_DRAWINGS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_LOTTERY_DRAWINGS_SUCCESS: {
			const { drawings, issue, } = action;
			const originDrawings = state.get('drawings').toArray();
			const updatedDrawings = issue ? originDrawings.concat(drawings) : drawings;

			return state
				.set('drawings', List(updatedDrawings))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_LOTTERY_DRAWINGS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_STOP_LOTTERY_DRAWING:
			return state
				.set('stopLotteryDrawingLoadingStatus', LoadingStatusEnum.LOADING);
		case STOP_LOTTERY_DRAWING_SUCCESS: {
			const { issue, } = action.drawing;
			const drawings = state.get('drawings').toArray();
			const updatedDrawings = drawings.map(_drawing => {
				if (_drawing.issue === issue) {
					return _drawing = {
						...action.drawing,
					};
				}
				return _drawing;
			});

			return state
				.set('drawings', List(updatedDrawings))
				.set('stopLotteryDrawingLoadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case STOP_LOTTERY_DRAWING_FAILED:
			return state
				.set('stopLotteryDrawingLoadingStatus', LoadingStatusEnum.FAILED)
				.set('stopLotteryDrawingLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

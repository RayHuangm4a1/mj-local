import { Map, } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
const {
	START_FETCH_LOTTERY_DRAWING_DETAIL,
	FETCH_LOTTERY_DRAWING_DETAIL_SUCCESS,
	FETCH_LOTTERY_DRAWING_DETAIL_FAILED,
	START_CANCEL_LOTTERY_DRAWING,
	CANCEL_LOTTERY_DRAWING_SUCCESS,
	CANCEL_LOTTERY_DRAWING_FAILED,
	START_FETCH_LOTTERY_DRAWING_BETTINGS_COUNT,
	FETCH_LOTTERY_DRAWING_BETTINGS_COUNT_SUCCESS,
	FETCH_LOTTERY_DRAWING_BETTINGS_COUNT_FAILED,
	START_UPDATE_LOTTERY_DRAWING_OPENCODE,
	UPDATE_LOTTERY_DRAWING_OPENCODE_SUCCESS,
	UPDATE_LOTTERY_DRAWING_OPENCODE_FAILED,
} = actionTypes;

/*
lotteryDrawingDetail:
{
	data: Map({
		drawing: {
			"lotteryId": 16,
			"issue": 202003051048,
			"index": "1048",
			"opencode": "4,8,6,6,4",
			"startedAt": "2020-03-05T09:26:58.000Z",
			"closedAt": "2020-03-05T09:27:58.000Z",
			"openedAt": "2020-03-05T09:28:00.000Z",
			"isFetched": 1,
			"income": 1000,
			"expense": 0,
			"status": 3,
			"createdAt": "2020-03-05T09:28:10.000Z",
			"updatedAt": "2020-03-05T09:28:12.000Z"
		},
		bettingsCount: 1,   //下注人數
	})
}
*/

const initialState = Map({
	drawing: Map(),
	bettingsCount: 0,

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
	cancelLotteryDrawingLoadingStatus: LoadingStatusEnum.NONE,
	cancelLotteryDrawingLoadingStatusMessage: '',
	updateLotteryDrawingOpencodeLoadingStatus: LoadingStatusEnum.NONE,
	updateLotteryDrawingOpencodeLoadingStatusMessage: '',
	fetchLotteryDrawingBettingsCountLoadingStatus: LoadingStatusEnum.NONE,
	fetchLotteryDrawingBettingsCountLoadingStatusMessage: '',
});

export default function lotteryDrawingDetail(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_LOTTERY_DRAWING_DETAIL:
			return state
				.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_LOTTERY_DRAWING_DETAIL_SUCCESS:
			return state
				.set('drawing', Map(action.drawing))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_LOTTERY_DRAWING_DETAIL_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_CANCEL_LOTTERY_DRAWING:
			return state
				.set('cancelLotteryDrawingLoadingStatus', LoadingStatusEnum.LOADING);
		case CANCEL_LOTTERY_DRAWING_SUCCESS:
			return state
				.set('cancelLotteryDrawingLoadingStatus', LoadingStatusEnum.SUCCESS);
		case CANCEL_LOTTERY_DRAWING_FAILED:
			return state
				.set('cancelLotteryDrawingLoadingStatus', LoadingStatusEnum.FAILED)
				.set('cancelLotteryDrawingLoadingStatusMessage', action.errorMessage);

		case START_FETCH_LOTTERY_DRAWING_BETTINGS_COUNT:
			return state
				.set('fetchLotteryDrawingBettingsCountLoadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_LOTTERY_DRAWING_BETTINGS_COUNT_SUCCESS:
			return state
				.set('fetchLotteryDrawingBettingsCountLoadingStatus', LoadingStatusEnum.SUCCESS)
				.set('bettingsCount', action.bettingsCount);
		case FETCH_LOTTERY_DRAWING_BETTINGS_COUNT_FAILED:
			return state
				.set('fetchLotteryDrawingBettingsCountLoadingStatus', LoadingStatusEnum.FAILED)
				.set('fetchLotteryDrawingBettingsCountLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_LOTTERY_DRAWING_OPENCODE:
			return state
				.set('updateLotteryDrawingOpencodeLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_LOTTERY_DRAWING_OPENCODE_SUCCESS:
			return state
				.set('updateLotteryDrawingOpencodeLoadingStatus', LoadingStatusEnum.SUCCESS);
		case UPDATE_LOTTERY_DRAWING_OPENCODE_FAILED:
			return state
				.set('updateLotteryDrawingOpencodeLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLotteryDrawingOpencodeLoadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

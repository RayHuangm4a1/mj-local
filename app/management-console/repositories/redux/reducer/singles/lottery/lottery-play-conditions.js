import { List, Map } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

const {
	START_FETCH_LOTTERY_PLAY_CONDITIONS,
	FETCH_LOTTERY_PLAY_CONDITIONS_SUCCESS,
	FETCH_LOTTERY_PLAY_CONDITIONS_FAILED,
} = actionTypes;

const initialState = Map({
	data: List(),
	playConditionOptions: List(),

	loadingStatus: NONE,
	loadingStatusMessage: "",
});

export default function lotteryPlayConditions(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_LOTTERY_PLAY_CONDITIONS:
			return state.set('loadingStatus', LOADING);
		case FETCH_LOTTERY_PLAY_CONDITIONS_SUCCESS: {
			const playConditionOptions = getOptions(action.playConditions);

			return state
				.set('data', List(action.playConditions))
				.set('playConditionOptions', List(playConditionOptions))
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_LOTTERY_PLAY_CONDITIONS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

function getOptions(items) {
	return items.map(item => {
		return {
			label: item.name,
			value: item.id,
			subconditions: item.subconditions,
		};
	});
}

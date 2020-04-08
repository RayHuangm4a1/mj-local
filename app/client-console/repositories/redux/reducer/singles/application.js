import { Map, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_INITIALIZE_APPLICATION,
	INITIALIZE_APPLICATION_SUCCESS,
	INITIALIZE_APPLICATION_FAILED,
} = actionTypes;

const initialState = Map({
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function bettings(state = initialState, action) {
	switch (action.type) {
		case START_INITIALIZE_APPLICATION:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case INITIALIZE_APPLICATION_SUCCESS:
			return state.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case INITIALIZE_APPLICATION_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

import { Map, } from 'immutable';
import { actionTypes } from '../../../../controller';
import { LoadingStatusEnum } from '../../../../lib/enums';

const {
	START_FETCH_DEMO_ERROR_HANDLING,
	FETCH_DEMO_ERROR_HANDLING_SUCCESS,
	FETCH_DEMO_ERROR_HANDLING_FAILED,
} = actionTypes;

const initialState = Map({
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function demoErrorHandling(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_DEMO_ERROR_HANDLING:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_DEMO_ERROR_HANDLING_SUCCESS:
			return state.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_DEMO_ERROR_HANDLING_FAILED:
			return state.set('loadingStatus', LoadingStatusEnum.FAILED);
		default:
			return state;
	}
}

import { Map, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_TRACE,
	TRACE_SUCCESS,
	TRACE_FAILED,
} = actionTypes;

const initialState = Map({
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function traces(state = initialState, action) {
	switch (action.type) {
		case START_TRACE:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case TRACE_SUCCESS:
			return state
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case TRACE_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

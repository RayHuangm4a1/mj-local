import { Map } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const {
	START_INIT_USER_DETAILS_PAGE,
	INIT_USER_DETAILS_PAGE_SUCCESS,
	INIT_USER_DETAILS_PAGE_FAILED,
	SET_HAS_INIT_USER_DETAIL_PAGE,
} = actionTypes;

const initialState = Map({
	hasInitPage: false,

	loadingStatus: NONE,
	loadingStatusMessage: '',
});

export default function userDetailsPage(state = initialState, action) {
	switch (action.type) {
		case START_INIT_USER_DETAILS_PAGE:
			return state.set('loadingStatus', LOADING);
		case INIT_USER_DETAILS_PAGE_SUCCESS:
			return state
				.set('loadingStatus', SUCCESS);
		case INIT_USER_DETAILS_PAGE_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case SET_HAS_INIT_USER_DETAIL_PAGE:
			return state.set('hasInitPage', action.hasInit);
		default:
			return state;
	}
}

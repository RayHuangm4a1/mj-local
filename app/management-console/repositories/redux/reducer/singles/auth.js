import { Map, } from 'immutable';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	START_LOGOUT,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	START_CHECK_AUTH,
	CHECK_AUTH_SUCCESS,
	CHECK_AUTH_FAILED,
} = actionTypes;

const initialState = Map({
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',

	loginLoadingStatus: LoadingStatusEnum.NONE,
	loginLoadingStatusMessage: '',

	logoutLoadingStatus: LoadingStatusEnum.NONE,
	logoutLoadingStatusMessage: '',
});

export default function auth(state = initialState, action) {
	switch (action.type) {
		case START_LOGIN:
			return state.set('loginLoadingStatus', LoadingStatusEnum.LOADING);

		case LOGIN_SUCCESS:
			return state.set('loginLoadingStatus', LoadingStatusEnum.SUCCESS);

		case LOGIN_FAILED:
			return state
				.set('loginLoadingStatus', LoadingStatusEnum.FAILED)
				.set('loginLoadingStatusMessage', action.errorMessage);

		case START_LOGOUT:
			return state.set('logoutLoadingStatus', LoadingStatusEnum.LOADING);

		case LOGOUT_SUCCESS:
			return state
				.set('logoutLoadingStatus', LoadingStatusEnum.SUCCESS)
				.set('loadingStatus', LoadingStatusEnum.NONE);

		case LOGOUT_FAILED:
			return state
				.set('logoutLoadingStatus', LoadingStatusEnum.FAILED)
				.set('logoutLoadingStatusMessage', action.errorMessage);

		case START_CHECK_AUTH:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);

		case CHECK_AUTH_SUCCESS:
			return state.set('loadingStatus', LoadingStatusEnum.SUCCESS);

		case CHECK_AUTH_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

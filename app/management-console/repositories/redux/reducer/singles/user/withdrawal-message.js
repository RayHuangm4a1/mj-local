import { Map, } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING
} = LoadingStatusEnum;

const {
	START_FETCH_USER_WITHDRAWAL_MESSAGE,
	FETCH_USER_WITHDRAWAL_MESSAGE_SUCCESS,
	FETCH_USER_WITHDRAWAL_MESSAGE_FAILED,
	START_UPDATE_USER_WITHDRAWAL_MESSAGE,
	UPDATE_USER_WITHDRAWAL_MESSAGE_SUCCESS,
	UPDATE_USER_WITHDRAWAL_MESSAGE_FAILED,
	START_DELETE_USER_WITHDRAWAL_MESSAGE,
	DELETE_USER_WITHDRAWAL_MESSAGE_SUCCESS,
	DELETE_USER_WITHDRAWAL_MESSAGE_FAILED,
} = actionTypes;

/* example
data: "您目前已被禁止提現，如有問題請洽客服處理"
*/

const initialState = Map({
	data: '',

	loadingStatus: NONE,
	loadingStatusMessage: '',
	updateLoadingStatus: NONE,
	updateLoadingStatusMessage: '',
});

export default function withdrawalMessage(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_WITHDRAWAL_MESSAGE:
			return state.set('loadingStatus', LOADING);
		case FETCH_USER_WITHDRAWAL_MESSAGE_SUCCESS:
			return state
				.set('data', decodeMessage(action.message))
				.set('loadingStatus', SUCCESS);
		case FETCH_USER_WITHDRAWAL_MESSAGE_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case START_UPDATE_USER_WITHDRAWAL_MESSAGE:
		case START_DELETE_USER_WITHDRAWAL_MESSAGE:
			return state.set('updateLoadingStatus', LOADING);
		case UPDATE_USER_WITHDRAWAL_MESSAGE_SUCCESS:
		case DELETE_USER_WITHDRAWAL_MESSAGE_SUCCESS:
			return state.set('updateLoadingStatus', SUCCESS);
		case UPDATE_USER_WITHDRAWAL_MESSAGE_FAILED:
		case DELETE_USER_WITHDRAWAL_MESSAGE_FAILED:
			return state
				.set('updateLoadingStatus', FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

function decodeMessage(message) {
	return decodeURI(message);
}

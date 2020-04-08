import { Map } from 'immutable';
import { actionTypes, } from '../../../../controller';
import { LoadingStatusEnum } from '../../../../lib/enums';

/**
 * Data example
	data: Map({
		"id": 1,
		"username": "admin",
		"accountId": "5d4aea86e48b697af60c1201",
		"roleId": 1,
		"description": null,
		"ip": "127.0.0.1",
		"geo": "本机地址 CZ88.NET",
		"loginAt": "2020-03-11T11:02:10.083Z",
		"status": 1,
		"createdAt": "2020-03-11T10:45:27.000Z",
		"updatedAt": "2020-03-11T11:01:15.000Z"
	})
*/

const {
	START_FETCH_ME,
	FETCH_ME_SUCCESS,
	FETCH_ME_FAILED,
} = actionTypes;

const initialState = Map({
	data: Map(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function me(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_ME:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);

		case FETCH_ME_SUCCESS:
			return state
				.set('data', Map(action.me))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);

		case FETCH_ME_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.SUCCESS)
				.set('loadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

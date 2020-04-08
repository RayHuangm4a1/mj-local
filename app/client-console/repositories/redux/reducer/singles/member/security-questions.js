import { Map, List, } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_SECURITY_QUESTIONS,
	FETCH_SECURITY_QUESTIONS_SUCCESS,
	FETCH_SECURITY_QUESTIONS_FAILED,
} = actionTypes;

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

/* Example
data: List([
    {
        "id": 1,
        "name": "我最喜欢的国家"
    },
    {
        "id": 2,
        "name": "我最喜欢的城市"
    }
])
*/

const initialState = Map({
	data: List(),
	loadingStatus: NONE,
	loadingStatusMessage: '',
});

export default function securityQuestions(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_SECURITY_QUESTIONS:
			return state.set('loadingStatus', LOADING);
		case FETCH_SECURITY_QUESTIONS_SUCCESS: {
			return state
				.set('data', List(action.securityQuestions))
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_SECURITY_QUESTIONS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

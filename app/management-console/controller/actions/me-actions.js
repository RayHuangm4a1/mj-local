import {
	START_FETCH_ME,
	FETCH_ME_SUCCESS,
	FETCH_ME_FAILED,
} from './action-types';

export function fetchMeAction() {
	return {
		type: START_FETCH_ME,
	};
}

export function fetchMeSuccessAction(me) {
	return {
		type: FETCH_ME_SUCCESS,
		me,
	};
}

export function fetchMeFailedAction(error, errorMessage) {
	return {
		type: FETCH_ME_FAILED,
		error,
		errorMessage,
	};
}

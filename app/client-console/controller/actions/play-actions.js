import {
	SET_PLAY_ID,
	RESET_PLAY_ID,
	START_FETCH_PLAYS,
	FETCH_PLAYS_SUCCESS,
	FETCH_PLAYS_FAILED,
} from './action-types';

export function fetchPlaysAction(lotteryId) {
	return {
		type: START_FETCH_PLAYS,
		lotteryId,
	};
}
export function fetchPlaysSuccessAction(payload) {
	return {
		type: FETCH_PLAYS_SUCCESS,
		payload,
	};
}
export function fetchPlaysFailedAction(error, errorMessage) {
	return {
		type: FETCH_PLAYS_FAILED,
		error,
		errorMessage,
	};
}

export function setPlayIdAction(playId) {
	return {
		type: SET_PLAY_ID,
		playId,
	};
}
export function resetPlayIdAction() {
	return {
		type: RESET_PLAY_ID,
	};
}

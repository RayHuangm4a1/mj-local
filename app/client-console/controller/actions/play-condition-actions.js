import {
	START_FETCH_PLAY_CONDITIONS,
	FETCH_PLAY_CONDITIONS_SUCCESS,
	FETCH_PLAY_CONDITIONS_FAILED,
} from './action-types';

export function fetchPlayConditionsAction(lotteryId) {
	return {
		type: START_FETCH_PLAY_CONDITIONS,
		lotteryId,
	};
}
export function fetchPlayConditionsSuccessAction(payload) {
	return {
		type: FETCH_PLAY_CONDITIONS_SUCCESS,
		payload,
	};
}
export function fetchPlayConditionsFailedAction(error, errorMessage) {
	return {
		type: FETCH_PLAY_CONDITIONS_FAILED,
		error,
		errorMessage,
	};
}

import {
	START_FETCH_LOTTERY_PLAY_CONDITIONS,
	FETCH_LOTTERY_PLAY_CONDITIONS_SUCCESS,
	FETCH_LOTTERY_PLAY_CONDITIONS_FAILED,
} from '../action-types';

export function fetchLotteryPlayConditionsAction(lotteryId, playClassId) {
	return {
		type: START_FETCH_LOTTERY_PLAY_CONDITIONS,
		lotteryId,
		playClassId,
	};
}

export function fetchLotteryPlayConditionsSuccessAction(playConditions) {
	return {
		type: FETCH_LOTTERY_PLAY_CONDITIONS_SUCCESS,
		playConditions,
	};
}

export function fetchLotteryPlayConditionsFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERY_PLAY_CONDITIONS_FAILED,
		error,
		errorMessage,
	};
}

import {
	START_FETCH_LOTTERY_PLAYS,
	FETCH_LOTTERY_PLAYS_SUCCESS,
	FETCH_LOTTERY_PLAYS_FAILED,
	START_UPDATE_LOTTERY_PLAYS_STATUS,
	UPDATE_LOTTERY_PLAYS_STATUS_SUCCESS,
	UPDATE_LOTTERY_PLAYS_STATUS_FAILED,
	START_UPDATE_LOTTERY_PLAYS_BONUS,
	UPDATE_LOTTERY_PLAYS_BONUS_SUCCESS,
	UPDATE_LOTTERY_PLAYS_BONUS_FAILED,
} from '../action-types';

export function fetchLotteryPlaysAction(lotteryId, playClassId) {
	return {
		type: START_FETCH_LOTTERY_PLAYS,
		lotteryId,
		playClassId,
	};
}

export function fetchLotteryPlaysSuccessAction(plays) {
	return {
		type: FETCH_LOTTERY_PLAYS_SUCCESS,
		plays,
	};
}

export function fetchLotteryPlaysFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERY_PLAYS_FAILED,
		error,
		errorMessage,
	};
}

export function updateLotteryPlaysStatusAction({
	lotteryId,
	plays = [],
}) {
	return {
		type: START_UPDATE_LOTTERY_PLAYS_STATUS,
		lotteryId,
		plays,
	};
}

export function updateLotteryPlaysStatusSuccessAction() {
	return {
		type: UPDATE_LOTTERY_PLAYS_STATUS_SUCCESS,
	};
}

export function updateLotteryPlaysStatusFailedAction(error, errorMessage) {
	return {
		type: UPDATE_LOTTERY_PLAYS_STATUS_FAILED,
		error,
		errorMessage,
	};
}

export function updateLotteryPlaysBonusAction(lotteryId, plays = []) {
	return {
		type: START_UPDATE_LOTTERY_PLAYS_BONUS,
		lotteryId,
		plays,
	};
}

export function updateLotteryPlaysBonusSuccessAction() {
	return {
		type: UPDATE_LOTTERY_PLAYS_BONUS_SUCCESS,
	};
}

export function updateLotteryPlaysBonusFailedAction(error, errorMessage) {
	return {
		type: UPDATE_LOTTERY_PLAYS_BONUS_FAILED,
		error,
		errorMessage,
	};
}

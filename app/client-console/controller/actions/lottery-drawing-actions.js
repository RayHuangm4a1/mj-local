import {
	START_FETCH_LOTTERY_DRAWINGS,
	FETCH_LOTTERY_DRAWINGS_SUCCESS,
	FETCH_LOTTERY_DRAWINGS_FAILED,
	START_UPDATE_LOTTERY_DRAWINGS_INTERVAL,
	STOP_UPDATE_LOTTERY_DRAWINGS_INTERVAL,
	START_UPDATE_LOTTERY_DRAWINGS,
} from './action-types';

export function fetchLotteryDrawingsAction(lotteryId) {
	return {
		type: START_FETCH_LOTTERY_DRAWINGS,
		lotteryId,
	};
}
export function fetchLotteryDrawingsSuccessAction(lotteryId, drawings) {
	return {
		type: FETCH_LOTTERY_DRAWINGS_SUCCESS,
		lotteryId,
		drawings,
	};
}
export function fetchLotteryDrawingsFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERY_DRAWINGS_FAILED,
		error,
		errorMessage,
	};
}

export function startUpdateLotteryDrawingsIntervalAction(lotteryId) {
	return {
		type: START_UPDATE_LOTTERY_DRAWINGS_INTERVAL,
		lotteryId,
	};
}
export function stopUpdateLotteryDrawingsIntervalAction() {
	return {
		type: STOP_UPDATE_LOTTERY_DRAWINGS_INTERVAL,
	};
}

export function startUpdateLotteryDrawingsAction(lotteryId) {
	return {
		type: START_UPDATE_LOTTERY_DRAWINGS,
		lotteryId,
	};
}

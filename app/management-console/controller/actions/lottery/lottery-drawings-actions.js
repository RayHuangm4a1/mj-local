import {
	START_FETCH_LOTTERY_DRAWINGS,
	FETCH_LOTTERY_DRAWINGS_SUCCESS,
	FETCH_LOTTERY_DRAWINGS_FAILED,
	START_STOP_LOTTERY_DRAWING,
	STOP_LOTTERY_DRAWING_SUCCESS,
	STOP_LOTTERY_DRAWING_FAILED,
} from '../action-types';

export function fetchLotteryDrawingsAction(lotteryId, issue) {
	return {
		type: START_FETCH_LOTTERY_DRAWINGS,
		lotteryId,
		issue,
	};
}

export function fetchLotteryDrawingsSuccessAction({
	drawings = [],
	issue,
}) {
	return {
		type: FETCH_LOTTERY_DRAWINGS_SUCCESS,
		drawings,
		issue,
	};
}

export function fetchLotteryDrawingsFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERY_DRAWINGS_FAILED,
		error,
		errorMessage,
	};
}

export function stopLotteryDrawingAction(lotteryId, issue) {
	return {
		type: START_STOP_LOTTERY_DRAWING,
		lotteryId,
		issue,
	};
}

export function stopLotteryDrawingSuccessAction(drawing) {
	return {
		type: STOP_LOTTERY_DRAWING_SUCCESS,
		drawing,
	};
}

export function stopLotteryDrawingFailedAction(error, errorMessage) {
	return {
		type: STOP_LOTTERY_DRAWING_FAILED,
		error,
		errorMessage,
	};
}

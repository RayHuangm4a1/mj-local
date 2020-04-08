import {
	START_FETCH_LOTTERY_DRAWING_DETAIL,
	FETCH_LOTTERY_DRAWING_DETAIL_SUCCESS,
	FETCH_LOTTERY_DRAWING_DETAIL_FAILED,
	START_CANCEL_LOTTERY_DRAWING,
	CANCEL_LOTTERY_DRAWING_SUCCESS,
	CANCEL_LOTTERY_DRAWING_FAILED,
	START_FETCH_LOTTERY_DRAWING_BETTINGS_COUNT,
	FETCH_LOTTERY_DRAWING_BETTINGS_COUNT_SUCCESS,
	FETCH_LOTTERY_DRAWING_BETTINGS_COUNT_FAILED,
	START_UPDATE_LOTTERY_DRAWING_OPENCODE,
	UPDATE_LOTTERY_DRAWING_OPENCODE_SUCCESS,
	UPDATE_LOTTERY_DRAWING_OPENCODE_FAILED,
	START_UPDATE_LOTTERY_DRAWING_INTERVAL,
	STOP_UPDATE_LOTTERY_DRAWING_INTERVAL,
} from '../action-types';

export function fetchLotteryDrawingDetailAction(lotteryId, issue) {
	return {
		type: START_FETCH_LOTTERY_DRAWING_DETAIL,
		lotteryId,
		issue,
	};
}

export function fetchLotteryDrawingDetailSuccessAction(drawing) {
	return {
		type: FETCH_LOTTERY_DRAWING_DETAIL_SUCCESS,
		drawing,
	};
}

export function fetchLotteryDrawingDetailFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERY_DRAWING_DETAIL_FAILED,
		error,
		errorMessage,
	};
}

export function cancelLotteryDrawingAction(lotteryId, issue) {
	return {
		type: START_CANCEL_LOTTERY_DRAWING,
		lotteryId,
		issue,
	};
}

export function cancelLotteryDrawingSuccessAction() {
	return {
		type: CANCEL_LOTTERY_DRAWING_SUCCESS,
	};
}

export function cancelLotteryDrawingFailedAction(error, errorMessage) {
	return {
		type: CANCEL_LOTTERY_DRAWING_FAILED,
		error,
		errorMessage,
	};
}

export function fetchLotteryDrawingBettingsCountAction(lotteryId, issue) {
	return {
		type: START_FETCH_LOTTERY_DRAWING_BETTINGS_COUNT,
		lotteryId,
		issue,
	};
}

export function fetchLotteryDrawingBettingsCountSuccessAction(bettingsCount) {
	return {
		type: FETCH_LOTTERY_DRAWING_BETTINGS_COUNT_SUCCESS,
		bettingsCount,
	};
}

export function fetchLotteryDrawingBettingsCountFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERY_DRAWING_BETTINGS_COUNT_FAILED,
		error,
		errorMessage,
	};
}

export function updateLotteryDrawingOpencodeAction(lotteryId, issue, opencode) {
	return {
		type: START_UPDATE_LOTTERY_DRAWING_OPENCODE,
		lotteryId,
		issue,
		opencode,
	};
}

export function updateLotteryDrawingOpencodeSuccessAction() {
	return {
		type: UPDATE_LOTTERY_DRAWING_OPENCODE_SUCCESS,
	};
}

export function updateLotteryDrawingOpencodeFailedAction(error, errorMessage) {
	return {
		type: UPDATE_LOTTERY_DRAWING_OPENCODE_FAILED,
		error,
		errorMessage,
	};
}

export function startUpdateLotteryDrawingIntervalAction(lotteryId, issue) {
	return {
		type: START_UPDATE_LOTTERY_DRAWING_INTERVAL,
		lotteryId,
		issue,
	};
}

export function stopUpdateLotteryDrawingIntervalAction() {
	return {
		type: STOP_UPDATE_LOTTERY_DRAWING_INTERVAL,
	};
}

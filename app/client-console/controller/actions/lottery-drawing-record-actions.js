import {
	START_FETCH_LOTTERY_DRAWING_RECORDS,
	FETCH_LOTTERY_DRAWING_RECORDS_SUCCESS,
	FETCH_LOTTERY_DRAWING_RECORDS_FAILED,
	PREPEND_LOTTERY_DRAWING_RECORD,
	CLEAR_LOTTERY_DRAWING_RECORDS,
} from './action-types';

export function fetchLotteryDrawingRecordsAction(lotteryId) {
	return {
		type: START_FETCH_LOTTERY_DRAWING_RECORDS,
		lotteryId,
	};
}
export function fetchLotteryDrawingRecordsSuccessAction(lotteryDrawingRecords = []) {
	return {
		type: FETCH_LOTTERY_DRAWING_RECORDS_SUCCESS,
		lotteryDrawingRecords,
	};
}
export function fetchLotteryDrawingRecordsFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERY_DRAWING_RECORDS_FAILED,
		error,
		errorMessage,
	};
}

export function prependLotteryDrawingRecordAction(lotteryDrawingRecord = {}) {
	return {
		type: PREPEND_LOTTERY_DRAWING_RECORD,
		lotteryDrawingRecord,
	};
}

export function clearLotteryDrawingRecordsAction() {
	return {
		type: CLEAR_LOTTERY_DRAWING_RECORDS,
	};
}

import {
	START_FETCH_LOTTERY_CLASSES,
	FETCH_LOTTERY_CLASSES_SUCCESS,
	FETCH_LOTTERY_CLASSES_FAILED,
} from './action-types';

export function fetchLotteryClassesAction(query = {}) {
	return {
		type: START_FETCH_LOTTERY_CLASSES,
		query,
	};
}
export function fetchLotteryClassesSuccessAction(lotteryClasses = []) {
	return {
		type: FETCH_LOTTERY_CLASSES_SUCCESS,
		lotteryClasses,
	};
}
export function fetchLotteryClassesFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERY_CLASSES_FAILED,
		error,
		errorMessage,
	};
}

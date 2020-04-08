import {
	START_INIT_LOTTERY_MANAGEMENT_PAGE,
	INIT_LOTTERY_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_MANAGEMENT_PAGE_FAILED,
} from '../action-types';

export function initLotteryManagementPageAction() {
	return {
		type: START_INIT_LOTTERY_MANAGEMENT_PAGE,
	};
}

export function initLotteryManagementPageSuccessAction(lotteryClasses) {
	return {
		type: INIT_LOTTERY_MANAGEMENT_PAGE_SUCCESS,
		lotteryClasses,
	};
}

export function initLotteryManagementPageFailedAction(error, errorMessage) {
	return {
		type: INIT_LOTTERY_MANAGEMENT_PAGE_FAILED,
		error,
		errorMessage,
	};
}

import {
	START_INIT_LOTTERY_CLASS_MANAGEMENT_PAGE,
	INIT_LOTTERY_CLASS_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_CLASS_MANAGEMENT_PAGE_FAILED,
} from './action-types';

export function initLotteryClassManagementPageAction() {
	return {
		type: START_INIT_LOTTERY_CLASS_MANAGEMENT_PAGE,
	};
}

export function initLotteryClassManagementPageSuccessAction() {
	return {
		type: INIT_LOTTERY_CLASS_MANAGEMENT_PAGE_SUCCESS,
	};
}

export function initLotteryClassManagementPageFailedAction(error, errorMessage) {
	return {
		type: INIT_LOTTERY_CLASS_MANAGEMENT_PAGE_FAILED,
		error,
		errorMessage,
	};
}

import {
	START_INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE,
	INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE_FAILED,
} from '../action-types';

export function startInitLotterySpecialManagementPageAction() {
	return {
		type: START_INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE,
	};
}

export function initLotterySpecialManagementPageSuccessAction() {
	return {
		type: INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE_SUCCESS,
	};
}

export function initLotterySpecialManagementPageFailedAction(error, errorMessage) {
	return {
		type: INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE_FAILED,
		error,
		errorMessage,
	};
}

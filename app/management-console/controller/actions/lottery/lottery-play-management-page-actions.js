import {
	START_INIT_LOTTERY_PLAY_MANAGEMENT_PAGE,
	INIT_LOTTERY_PLAY_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_PLAY_MANAGEMENT_PAGE_FAILED,
	START_FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS,
	FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS_SUCCESS,
	FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS_FAILED,
	SET_LOTTERY_PLAY_MANAGEMENT_PAGE_LOTTERY_CLASS_ID,
} from '../action-types';

export function initLotteryPlayManagementPageAction() {
	return {
		type: START_INIT_LOTTERY_PLAY_MANAGEMENT_PAGE,
	};
}

export function initLotteryPlayManagementPageSuccessAction(lotteryClasses, lotteriesMap) {
	return {
		type: INIT_LOTTERY_PLAY_MANAGEMENT_PAGE_SUCCESS,
		lotteryClasses,
		lotteriesMap,
	};
}

export function initLotteryPlayManagementPageFailedAction(error, errorMessage) {
	return {
		type: INIT_LOTTERY_PLAY_MANAGEMENT_PAGE_FAILED,
		error,
		errorMessage,
	};
}

export function fetchLotteryPlayManagementPagePlaysAction(lotteryId, playClassId) {
	return {
		type: START_FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS,
		lotteryId,
		playClassId,
	};
}

export function fetchLotteryPlayManagementPagePlaysSuccessAction() {
	return {
		type: FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS_SUCCESS,
	};
}

export function fetchLotteryPlayManagementPagePlaysFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS_FAILED,
		error,
		errorMessage,
	};
}

export function setLotteryPlayManagementPageLotteryClassIdAction(selectedLotteryClassId) {
	return {
		type: SET_LOTTERY_PLAY_MANAGEMENT_PAGE_LOTTERY_CLASS_ID,
		selectedLotteryClassId,
	};
}

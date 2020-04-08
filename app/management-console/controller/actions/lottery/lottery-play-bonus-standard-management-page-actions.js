import {
	START_INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE,
	INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_FAILED,
	START_FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS,
	FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS_SUCCESS,
	FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS_FAILED,
	SET_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_LOTTERY_CLASS_ID,
	// TODO: 之後改用 url 帶 query 的方法完成後，要刪掉 RESET_LOTTERY_CLASS_ID
	RESET_LOTTERY_CLASS_ID,
} from '../action-types';

export function initLotteryPlayBonusStandardManagementPageAction() {
	return {
		type: START_INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE,
	};
}

export function initLotteryPlayBonusStandardManagementPageSuccessAction(lotteryClasses, lotteriesMap) {
	return {
		type: INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_SUCCESS,
		lotteryClasses,
		lotteriesMap,
	};
}

export function initLotteryPlayBonusStandardManagementPageFailedAction(error, errorMessage) {
	return {
		type: INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_FAILED,
		error,
		errorMessage,
	};
}

export function fetchLotteryPlayBonusStandardManagementPagePlaysAction(lotteryId, playClassId) {
	return {
		type: START_FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS,
		lotteryId,
		playClassId,
	};
}

export function fetchLotteryPlayBonusStandardManagementPagePlaysSuccessAction(plays) {
	return {
		type: FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS_SUCCESS,
		plays,
	};
}

export function fetchLotteryPlayBonusStandardManagementPagePlaysFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS_FAILED,
		error,
		errorMessage,
	};
}

export function setLotteryPlayBonusStandardManagementPageLotteryClassIdAction(selectedLotteryClassId, lotteries) {
	return {
		type: SET_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_LOTTERY_CLASS_ID,
		selectedLotteryClassId,
		lotteries,
	};
}

// TODO: 之後改用 url 帶 query 的方法完成後，要刪掉 resetLotteryClassIdAction
export function resetLotteryClassIdAction() {
	return {
		type: RESET_LOTTERY_CLASS_ID,
	};
}

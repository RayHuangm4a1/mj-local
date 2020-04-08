import {
	START_INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE,
	INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_FAILED,
	SET_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_LOTTERY_OPTIONS,
} from '../action-types';

export function startInitLotteryPlayBonusXinyongManagementPageAction() {
	return {
		type: START_INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE,
	};
}

export function initLotteryPlayBonusXinyongManagementPageSuccessAction(lotteryClasses, lotteriesMap) {
	return {
		type: INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_SUCCESS,
		lotteryClasses,
		lotteriesMap,
	};
}

export function initLotteryPlayBonusXinyongManagementPageFailedAction(error, errorMessage) {
	return {
		type: INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_FAILED,
		error,
		errorMessage,
	};
}

export function setLotteryPlayBonusXinyongManagementPageLotteryOptionsAction(lotteries) {
	return {
		type: SET_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_LOTTERY_OPTIONS,
		lotteries,
	};
}

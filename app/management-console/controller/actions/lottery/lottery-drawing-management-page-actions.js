import {
	START_INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE,
	INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE_FAILED,
	SET_LOTTERY_DRAWING_CLASS_OPTIONS,
	SET_LOTTERY_DRAWING_TABS,
	SET_LOTTERY_DRAWING_INTERVAL,
	START_UPDATE_DRAWING_INTERVAL,
	STOP_UPDATE_DRAWING_INTERVAL,
	SET_SELECTED_LOTTERY_DRAWING,
	REMOVE_SELECTED_LOTTERY_DRAWING,
} from '../action-types';

export function initLotteryDrawingManagementPageAction() {
	return {
		type: START_INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE,
	};
}

export function initLotteryDrawingManagementPageSuccessAction() {
	return {
		type: INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE_SUCCESS,
	};
}

export function initLotteryDrawingManagementPageFailedAction(error, errorMessage) {
	return {
		type: INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE_FAILED,
		error,
		errorMessage,
	};
}

export function setLotteryDrawingClassOptionsAction(lotteryClasses) {
	return {
		type: SET_LOTTERY_DRAWING_CLASS_OPTIONS,
		lotteryClasses,
	};
}

export function setLotteryDrawingTabsAction(lotteriesMap, selectedLotteryClassId) {
	return {
		type: SET_LOTTERY_DRAWING_TABS,
		lotteriesMap,
		selectedLotteryClassId,
	};
}

export function setLotteryDrawingIntervalAction(interval) {
	return {
		type: SET_LOTTERY_DRAWING_INTERVAL,
		interval,
	};
}

export function startUpdateLotteryDrawingsIntervalAction(interval, lotteryId) {
	return {
		type: START_UPDATE_DRAWING_INTERVAL,
		interval,
		lotteryId,
	};
}

export function stopUpdateLotteryDrawingsIntervalAction() {
	return {
		type: STOP_UPDATE_DRAWING_INTERVAL,
	};
}

export function setSelectedLotteryDrawingAction(drawing) {
	return {
		type: SET_SELECTED_LOTTERY_DRAWING,
		drawing,
	};
}

export function removeSelectedLotteryDrawingAction() {
	return {
		type: REMOVE_SELECTED_LOTTERY_DRAWING,
	};
}

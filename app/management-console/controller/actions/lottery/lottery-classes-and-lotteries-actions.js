import {
	START_FETCH_LOTTERY_CLASSES_AND_LOTTERIES,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED,
	START_UPDATE_LOTTERIES_ORDERING_AND_HOTTAG,
	UPDATE_LOTTERIES_ORDERING_AND_HOTTAG_SUCCESS,
	UPDATE_LOTTERIES_ORDERING_AND_HOTTAG_FAILED,
	START_UPDATE_LOTTERY_STATUS,
	UPDATE_LOTTERY_STATUS_SUCCESS,
	UPDATE_LOTTERY_STATUS_FAILED,
	START_UPDATE_LOTTERY_CLASS_STATUS,
	UPDATE_LOTTERY_CLASS_STATUS_SUCCESS,
	UPDATE_LOTTERY_CLASS_STATUS_FAILED,
} from '../action-types';

export function fetchLotteryClassesAndLotteriesAction() {
	return {
		type: START_FETCH_LOTTERY_CLASSES_AND_LOTTERIES,
	};
}

export function fetchLotteryClassesAndLotteriesSuccessAction(payload) {
	return {
		type: FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS,
		payload,
	};
}

export function fetchLotteryClassesAndLotteriesFailedAction(error, errorMessage) {
	return {
		type: FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED,
		error,
		errorMessage,
	};
}

export function updateLotteryStatusAction({
	lotteryId,
	status,
}) {
	return {
		type: START_UPDATE_LOTTERY_STATUS,
		lotteryId, status
	};
}

export function updateLotteryStatusSuccessAction() {
	return {
		type: UPDATE_LOTTERY_STATUS_SUCCESS,
	};
}

export function updateLotteryStatusFailedAction(error, errorMessage) {
	return {
		type: UPDATE_LOTTERY_STATUS_FAILED,
		error,
		errorMessage,
	};
}

export function updateLotteryClassStatusAction({
	lotteryClassId,
	status,
}) {
	return {
		type: START_UPDATE_LOTTERY_CLASS_STATUS,
		lotteryClassId,
		status,
	};
}

export function updateLotteryClassStatusSuccessAction() {
	return {
		type: UPDATE_LOTTERY_CLASS_STATUS_SUCCESS,
	};
}

export function updateLotteryClassStatusFailedAction(error, errorMessage) {
	return {
		type: UPDATE_LOTTERY_CLASS_STATUS_FAILED,
		error,
		errorMessage,
	};
}

export function updateLotteriesOrderingAndHotTagAction(payload) {
	return {
		type: START_UPDATE_LOTTERIES_ORDERING_AND_HOTTAG,
		lotteryClassId: payload.lotteryClassId,
		lotteriesOrderingAndHotTagData: payload.lotteriesOrderingAndHotTagData,
	};
}

export function updateLotteriesOrderingAndHotTagSuccessAction() {
	return {
		type: UPDATE_LOTTERIES_ORDERING_AND_HOTTAG_SUCCESS,
	};
}

export function updateLotteriesOrderingAndHotTagFailedAction(error, errorMessage) {
	return {
		type: UPDATE_LOTTERIES_ORDERING_AND_HOTTAG_FAILED,
		error,
		errorMessage,
	};
}

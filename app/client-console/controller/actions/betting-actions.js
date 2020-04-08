import {
	START_BET,
	BET_SUCCESS,
	BET_FAILED,
	ADD_BETTING,
	UPDATE_BETTING,
	SET_BETTINGS,
	CLEAR_BETTING,
	CLEAR_BETTINGS,
	UPDATE_ALL_BETTINGS_AMOUNT_PER_BET,
	RESET_STANDARD_BETTING_ELEMENT,
	SET_BETTING_PROCESS_INIT,
	SET_BETTING_PROCESS_NO_PASSWORD,
	CANCEL_BET,
} from './action-types';

export function startBetAction(lotteryId, {
	bettings,
	password,
}) {
	return {
		type: START_BET,
		lotteryId,
		bettings,
		password,
	};
}
export function betSuccessAction(payload) {
	return {
		type: BET_SUCCESS,
		payload,
	};
}
export function betFailedAction(error, errorMessage) {
	return {
		type: BET_FAILED,
		error,
		errorMessage,
	};
}

export function addBettingAction(data) {
	return {
		type: ADD_BETTING,
		data,
	};
}

export function updateBettingAction(index, data) {
	return {
		type: UPDATE_BETTING,
		index,
		data,
	};
}

export function setBettingsAction(bettings) {
	return {
		type: SET_BETTINGS,
		bettings,
	};
}

export function clearBettingAction(index) {
	return {
		type: CLEAR_BETTING,
		index,
	};
}

export function clearBettingsAction() {
	return {
		type: CLEAR_BETTINGS,
	};
}

export function updateAllBettingsAmountPerBetAction(amountPerBet) {
	return {
		type: UPDATE_ALL_BETTINGS_AMOUNT_PER_BET,
		amountPerBet,
	};
}

export function resetStandardBettingElementAction() {
	return {
		type: RESET_STANDARD_BETTING_ELEMENT,
	};
}

export function setBettingProcessInitAction() {
	return {
		type: SET_BETTING_PROCESS_INIT,
	};
}

export function setBettingProcessNoPasswordAction() {
	return {
		type: SET_BETTING_PROCESS_NO_PASSWORD,
	};
}

export function cancelBetAction() {
	return {
		type: CANCEL_BET,
	};
}

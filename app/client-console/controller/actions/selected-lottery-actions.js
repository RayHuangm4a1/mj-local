import {
	SET_SELECTED_LOTTERY,
	CLEAR_SELECTED_LOTTERY,
} from './action-types';

export function setSelectedLotteryAction(lottery) {
	return {
		type: SET_SELECTED_LOTTERY,
		lottery,
	};
}

export function clearSelectedLotteryAction() {
	return {
		type: CLEAR_SELECTED_LOTTERY,
	};
}

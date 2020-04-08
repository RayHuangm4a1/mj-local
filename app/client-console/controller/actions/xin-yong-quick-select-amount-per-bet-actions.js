import {
	SET_XIN_YONG_QUICK_SELECT_AMOUNT_PER_BET,
} from './action-types';

export function setXinYongQuickSelectAmountPerBetAction(amountPerBet) {
	return {
		type: SET_XIN_YONG_QUICK_SELECT_AMOUNT_PER_BET,
		amountPerBet,
	};
}

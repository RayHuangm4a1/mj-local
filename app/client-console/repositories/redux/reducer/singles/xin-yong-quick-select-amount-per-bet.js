import { actionTypes } from '../../../../controller';

const {
	SET_XIN_YONG_QUICK_SELECT_AMOUNT_PER_BET,
} = actionTypes;

const initialState = 1;

export default function xinYongQuickSelectAmountPerBet(state = initialState, action) {
	switch (action.type) {
		case SET_XIN_YONG_QUICK_SELECT_AMOUNT_PER_BET:
			return action.amountPerBet;
		default:
			return state;
	}
}

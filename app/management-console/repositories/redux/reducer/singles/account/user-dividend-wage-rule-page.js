import { Map } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const {
	START_INIT_USER_DIVIDEND_WAGE_RULE_PAGE,
	INIT_USER_DIVIDEND_WAGE_RULE_PAGE_SUCCESS,
	INIT_USER_DIVIDEND_WAGE_RULE_PAGE_FAILED,
} = actionTypes;

const initialState = Map({
	loadingStatus: NONE,
	loadingStatusMessage: '',
});

export default function userDividendWageRulePage(state = initialState, action) {
	switch (action.type) {
		case START_INIT_USER_DIVIDEND_WAGE_RULE_PAGE:
			return state.set('loadingStatus', LOADING);
		case INIT_USER_DIVIDEND_WAGE_RULE_PAGE_SUCCESS:
			return state
				.set('loadingStatus', SUCCESS);
		case INIT_USER_DIVIDEND_WAGE_RULE_PAGE_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

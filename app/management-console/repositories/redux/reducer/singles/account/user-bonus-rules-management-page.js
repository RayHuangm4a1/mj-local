import { Map } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	START_INIT_USER_BONUS_RULES_MANAGEMENT_PAGE,
	INIT_USER_BONUS_RULES_MANAGEMENT_PAGE_SUCCESS,
	INIT_USER_BONUS_RULES_MANAGEMENT_PAGE_FAILED,
} = actionTypes;

// TODO check state schema
const initialState = Map({
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function userBonusRulesManagementPage(state = initialState, action) {
	switch (action.type) {
		case START_INIT_USER_BONUS_RULES_MANAGEMENT_PAGE:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case INIT_USER_BONUS_RULES_MANAGEMENT_PAGE_SUCCESS:
			return state
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case INIT_USER_BONUS_RULES_MANAGEMENT_PAGE_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

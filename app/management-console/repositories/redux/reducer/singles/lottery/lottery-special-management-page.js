import { Map } from 'immutable';
import {
	actionTypes
} from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	START_INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE,
	INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE_FAILED,
} = actionTypes;

const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;

const initialState = Map({
	loadingStatus: NONE,
	loadingStatusMessage: '',
});

export default function lotterySpecialManagementPage(state = initialState, action) {
	switch (action.type) {
		case START_INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE: 
			return state.set('loadingStatus', LOADING);
		case INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE_SUCCESS: 
			return state.set('loadingStatus', SUCCESS);
		case INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE_FAILED: 
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default: 
			return state;
	}
}
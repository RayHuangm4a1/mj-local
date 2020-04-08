import { Map, } from "immutable";
import {
	START_INIT_LOTTERY_CLASS_MANAGEMENT_PAGE,
	INIT_LOTTERY_CLASS_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_CLASS_MANAGEMENT_PAGE_FAILED,
} from "../../../../../controller/actions/action-types";

import { LoadingStatusEnum, } from "../../../../../lib/enums";

const initialState = Map({
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function lotteryClassManagementPage(state = initialState, action) {
	switch (action.type) {
		case START_INIT_LOTTERY_CLASS_MANAGEMENT_PAGE:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);

		case INIT_LOTTERY_CLASS_MANAGEMENT_PAGE_SUCCESS:
			return state.set('loadingStatus', LoadingStatusEnum.SUCCESS);

		case INIT_LOTTERY_CLASS_MANAGEMENT_PAGE_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

import { Map, List } from "immutable";
import {
	START_INIT_LOTTERY_MANAGEMENT_PAGE,
	INIT_LOTTERY_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_MANAGEMENT_PAGE_FAILED,
} from '../../../../../controller/actions/action-types';

import { LoadingStatusEnum } from '../../../../../lib/enums';

/*
lotteryClassOptions: :
[
	{
		label: 时时彩,
		value: 0,
	}
	...
]
*/

const initialState = Map({
	lotteryClassOptions: List(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function lotteryManagementPage(state = initialState, action) {
	switch (action.type) {
		case START_INIT_LOTTERY_MANAGEMENT_PAGE:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);

		case INIT_LOTTERY_MANAGEMENT_PAGE_SUCCESS: {
			const lotteryClassOptions = getOptions(action.lotteryClasses);

			return state
				.set('lotteryClassOptions', List(lotteryClassOptions))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}

		case INIT_LOTTERY_MANAGEMENT_PAGE_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

function getOptions(items) {
	return items.map(item => {
		return {
			label: item.name,
			value: item.id,
		};
	});
}

import { Map, List } from 'immutable';
import {
	actionTypes
} from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	START_INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE,
	INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_FAILED,
	SET_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_LOTTERY_OPTIONS,
} = actionTypes;

const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;

const initialState = Map({
	lotteryClassOptions: List(),
	lotteryOptions: List(),

	loadingStatus: NONE,
	loadingStatusMessage: '',
});

export default function lotteryPlayBonusXinyongManagementPage(state = initialState, action) {
	switch (action.type) {
		case START_INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE:
			return state.set('loadingStatus', LOADING);
		case INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_SUCCESS: {
			const {
				lotteryClasses,
				lotteriesMap,
			} = action;
			const lotteryClassOptions = getOptions(lotteryClasses);
			const selectedLotteryClassId = lotteryClassOptions[0] ? lotteryClassOptions[0].value : null;
			const lotteryOptions = getOptions(lotteriesMap[selectedLotteryClassId]);

			return state
				.set('loadingStatus', SUCCESS)
				.set('lotteryClassOptions', List(lotteryClassOptions))
				.set('lotteryOptions', List(lotteryOptions));
		}
		case INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case SET_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE_LOTTERY_OPTIONS: 
			return state.set('lotteryOptions', List(getOptions(action.lotteries)));
		default:
			return state;
	}
}

const getOptions = (items) =>
	items.map(item => {
		return {
			label: item.name,
			value: item.id,
		};
	});

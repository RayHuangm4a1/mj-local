import {
	Map,
	List,
} from "immutable";
import { groupBy, } from 'lodash';
import { actionTypes, } from "../../../../../controller";
import { LoadingStatusEnum, } from "../../../../../lib/enums";

const {
	START_INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE,
	INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE_FAILED,
	SET_LOTTERY_DRAWING_CLASS_OPTIONS,
	SET_LOTTERY_DRAWING_TABS,
	SET_LOTTERY_DRAWING_INTERVAL,
	SET_SELECTED_LOTTERY_DRAWING,
	REMOVE_SELECTED_LOTTERY_DRAWING,
} = actionTypes;

/*
loadingStatus: NONE/LOADING/SUCCESS/FAILED,
loadingStatusMessage: 'Invalid query',

lotteryClassOptions:
[
	{
		label: "时时彩",
		value: "ssc"
	},
]

lotteryTabs:
[
	{
		id: 1,
		key: "cqssc",
		tab: "重庆时时彩",
		platformBonus: 1956,
		lotteryClass: {
			_id: "_id",
			id: 0,
			name: "时时彩",
			code: "ssc",
		},
	},
]

lotteryInterval:
{
	interval: 'no'	// options value
	intervalTimeId: 0 // timeInterval timer ID
}
*/

const initialState = Map({
	// page init
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',

	// feature setting
	lotteryClassOptions: List(),
	lotteryTabsData: List(),
	selectedLotteryDrawingData: Map(),
	selectedLotteryClassId: null,
	lotteryInterval: Map({
		interval: 'no',
	}),
});

export default function lotteryDrawingManagementPage(state = initialState, action) {
	switch (action.type) {
		case START_INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);

		case INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE_SUCCESS:
			return state.set('loadingStatus', LoadingStatusEnum.SUCCESS);

		case INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case SET_LOTTERY_DRAWING_CLASS_OPTIONS: {
			const {
				lotteryClasses,
			} = action;

			return state
				.set('lotteryClassOptions', List(mapLotteryClassesToOptions(lotteryClasses)));
		}
		case SET_LOTTERY_DRAWING_TABS: {
			const {
				lotteriesMap,
				selectedLotteryClassId,
			} = action;
			const lotteryTabsData = getLotteryTabsData(lotteriesMap, selectedLotteryClassId);

			return state
				.set('lotteryTabsData', List(mapLotteriesToTabs(lotteryTabsData)))
				.set('selectedLotteryClassId', selectedLotteryClassId);
		}
		case SET_LOTTERY_DRAWING_INTERVAL: {
			const {
				interval,
			} = action;

			return state
				.set('lotteryInterval',Map({ interval }));
		}
		case SET_SELECTED_LOTTERY_DRAWING:
		{
			const { drawing, } = action;

			return state
				.set('selectedLotteryDrawingData', Map(drawing));
		}
		case REMOVE_SELECTED_LOTTERY_DRAWING:
			return state.set('selectedLotteryDrawingData', Map());

		default:
			return state;
	}
}

function mapLotteryClassesToOptions(lotteryClasses) {
	return lotteryClasses.map((lotteryClass) => {
		return {
			label: lotteryClass.name,
			value: lotteryClass.id,
		};
	});
}

function mapLotteriesToTabs(lotteries) {
	return lotteries.map(lottery => Object.assign({}, {
		id: lottery.id,
		key: lottery.code,
		tab: lottery.name,
	}));
}

function getLotteryTabsData(lotteriesData = {}, selectedLotteryClassId = '') {
	const hasMatchData = lotteriesData[selectedLotteryClassId] !== undefined;

	if (hasMatchData) {
		return lotteriesData[selectedLotteryClassId];
	}
	return [];
}

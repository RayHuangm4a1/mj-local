import { Map, List } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_INIT_LOTTERY_PLAY_MANAGEMENT_PAGE,
	INIT_LOTTERY_PLAY_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_PLAY_MANAGEMENT_PAGE_FAILED,
	START_FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS,
	FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS_SUCCESS,
	FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS_FAILED,
	SET_LOTTERY_PLAY_MANAGEMENT_PAGE_LOTTERY_CLASS_ID,
} = actionTypes;

/*
lotteryClassOptions:
[
	{
		label: "时时彩",
		value: "ssc"
	},
]
*/

const initialState = Map({
	lotteryClassOptions: List(),
	selectedLotteryClassId: null,

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
	playsLoadingStatus: LoadingStatusEnum.NONE,
	playsLoadingStatusMessage: '',
});

export default function lotteryPlayManagementPage(state = initialState, action) {
	switch (action.type) {
		case START_INIT_LOTTERY_PLAY_MANAGEMENT_PAGE:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case INIT_LOTTERY_PLAY_MANAGEMENT_PAGE_SUCCESS: {
			const { lotteryClasses, } = action;
			const selectedLotteryClassId = state.get('selectedLotteryClassId');
			const lotteryClassOptions = mapLotteryClassesToOptions(lotteryClasses);

			if (selectedLotteryClassId) {
				return state
					.set('lotteryClassOptions', List(lotteryClassOptions))
					.set('selectedLotteryClassId', selectedLotteryClassId)
					.set('loadingStatus', LoadingStatusEnum.SUCCESS);
			}

			const firstLotteryClassId = getFirstLotteryClassId(lotteryClasses);

			if (firstLotteryClassId === -1) {
				return state
					.set('lotteryClassOptions', List(lotteryClassOptions))
					.set('loadingStatus', LoadingStatusEnum.SUCCESS);
			}

			return state
				.set('lotteryClassOptions', List(lotteryClassOptions))
				.set('selectedLotteryClassId', firstLotteryClassId)
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case INIT_LOTTERY_PLAY_MANAGEMENT_PAGE_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case START_FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS:
			return state.set('playsLoadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS_SUCCESS:
			return state.set('playsLoadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS_FAILED:
			return state
				.set('playsLoadingStatus', LoadingStatusEnum.FAILED)
				.set('playsLoadingStatusMessage', action.errorMessage);
		case SET_LOTTERY_PLAY_MANAGEMENT_PAGE_LOTTERY_CLASS_ID: 
			return state.set('selectedLotteryClassId', action.selectedLotteryClassId);

		default:
			return state;
	}
}

function getFirstLotteryClassId(lotteryClasses) {
	if (lotteryClasses.length > 0) {
		for (let i = 0; i < lotteryClasses.length; i++) {
			if (lotteryClasses[i].lotteries.length) {
				return lotteryClasses[i].id;
			}
		}
	}
	return -1;
}

function mapLotteryClassesToOptions(lotteryClasses) {
	return lotteryClasses.map((lotteryClass) => {
		return {
			label: lotteryClass.name,
			value: lotteryClass.id,
		};
	});
}

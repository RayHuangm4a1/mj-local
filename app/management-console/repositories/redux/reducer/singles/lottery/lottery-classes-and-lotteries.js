import { List, Map, } from 'immutable';
import { groupBy, } from 'lodash';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_LOTTERY_CLASSES_AND_LOTTERIES,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED,
	START_UPDATE_LOTTERIES_ORDERING_AND_HOTTAG,
	UPDATE_LOTTERIES_ORDERING_AND_HOTTAG_SUCCESS,
	UPDATE_LOTTERIES_ORDERING_AND_HOTTAG_FAILED,
	START_UPDATE_LOTTERY_STATUS,
	UPDATE_LOTTERY_STATUS_SUCCESS,
	UPDATE_LOTTERY_STATUS_FAILED,
	START_UPDATE_LOTTERY_CLASS_STATUS,
	UPDATE_LOTTERY_CLASS_STATUS_SUCCESS,
	UPDATE_LOTTERY_CLASS_STATUS_FAILED,
} = actionTypes;

/* Example
lotteryClasses:
[
	{
		_id: "_id",
		platform: {
			_id: "_id",
			name: "QQ",
			code: "qq",
		},
		id: 0,
		name: "时时彩",
		code: "ssc",
		createdAt: Date,
		updatedAt: Date,
	},
]

lotteries:
[
	{
		_id: "_id",
		platform: {
			_id: "_id",
		},
		lotteryClass: {
			_id: "_id",
			id: 0,
			name: "时时彩",
			code: "ssc",
		},
		playClasses: [
			{
				id: "id",
				name: "官方",
				code: "standard",
			},
			...
		],
		id: 0,
		name: "重庆时时彩",
		code: "cqssc",
		numOfIssues: 59,
		status: "online",
		createdAt: Date,
		updatedAt: Date,
	},
	...
]

lotteriesMap:
{
	0: [
		{
			id: 12,
			name: "东京1.5分彩",
			code: "dj1.5fc",
		},
		...
	],
	...
}
*/

const initialState = Map({
	lotteryClasses: List(),
	lotteries: List(),
	lotteriesMap: Map(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
	updateLotteryLoadingStatus: LoadingStatusEnum.NONE,
	updateLotteryLoadingStatusMessage: '',
	updateLotteriesOrderingAndHotTagLoadingStatus: LoadingStatusEnum.NONE,
	updateLotteriesOrderingAndHotTagLoadingStatusMessage: '',
	updateLotteryClassStatusLoadingStatus: LoadingStatusEnum.NONE,
	updateLotteryClassStatusLoadingStatusMessage: '',
});

export default function lotteryClassesAndLotteries(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_LOTTERY_CLASSES_AND_LOTTERIES:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);

		case FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS: {
			const {
				lotteryClasses,
				lotteries,
			} = action.payload;

			const lotteriesMap = groupBy(lotteries, item => item.lotteryClass && item.lotteryClass.id);

			return state
				.set('lotteryClasses', List(lotteryClasses))
				.set('lotteries', List(lotteries))
				.set('lotteriesMap', Map(lotteriesMap))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}

		case FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_UPDATE_LOTTERIES_ORDERING_AND_HOTTAG:
			return state.set('updateLotteriesOrderingAndHotTagLoadingStatus', LoadingStatusEnum.LOADING);

		case UPDATE_LOTTERIES_ORDERING_AND_HOTTAG_SUCCESS:
			return state.set('updateLotteriesOrderingAndHotTagLoadingStatus', LoadingStatusEnum.SUCCESS);

		case UPDATE_LOTTERIES_ORDERING_AND_HOTTAG_FAILED:
			return state
				.set('updateLotteriesOrderingAndHotTagLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLotteriesOrderingAndHotTagLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_LOTTERY_CLASS_STATUS:
			return state.set('updateLotteryClassStatusLoadingStatus', LoadingStatusEnum.LOADING);

		case UPDATE_LOTTERY_CLASS_STATUS_SUCCESS:
			return state.set('updateLotteryClassStatusLoadingStatus', LoadingStatusEnum.SUCCESS);

		case UPDATE_LOTTERY_CLASS_STATUS_FAILED:
			return state
				.set('updateLotteryClassStatusLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLotteryClassStatusLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_LOTTERY_STATUS:
			return state.set('updateLotteryLoadingStatus', LoadingStatusEnum.LOADING);

		case UPDATE_LOTTERY_STATUS_SUCCESS:
			return state
				.set('updateLotteryLoadingStatus', LoadingStatusEnum.SUCCESS);

		case UPDATE_LOTTERY_STATUS_FAILED:
			return state
				.set('updateLotteryLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLotteryLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

import { Map, List } from 'immutable';
import {
	START_INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE,
	INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_SUCCESS,
	INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_FAILED,
	START_FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS,
	FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS_SUCCESS,
	FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS_FAILED,
	SET_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_LOTTERY_CLASS_ID,
	// TODO: 之後改用 url 帶 query 的方法完成後，要刪掉 RESET_LOTTERY_CLASS_ID
	RESET_LOTTERY_CLASS_ID,
} from '../../../../../controller/actions/action-types';

import { LoadingStatusEnum } from '../../../../../lib/enums';

/*
lotteryClassOptions:
[
	{
		label: "时时彩",
		value: "ssc"
	},
]

lotteriesMap:
{
	0: [
		{
			_id: "_id",
			platform: {
				_id: "_id",
			},
			lotteryClass: {
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
	...
}

lotteryTabsData:
[
	{
		id: 1,
		key: "1",
		tab: "重庆时时彩",
		platformBonus: 1956,
	},
]

plays: 
[
	// 保留原本的 awards ，新增一個 award 供頁面使用
	// award 會改變資料結構，如果 awards 有多超過一個以上的 obj ，會把 awards 攤平
	{
		...plays,
		award: {
			name: '5单0双',
			deltaBonus: 0,
			numerator: 1,
			denominator: 100000
		},
	},
	{
		...plays,
		award: {
			name: '4单1双',
			deltaBonus: 0,
			numerator: 1,
			denominator: 100000
		},
	},
	...
	// 會透過 award 內 deltaBonus 去計算獎金號
	bonus: 1956
]
*/

const initialState = Map({
	lotteryClassOptions: List(),
	lotteryTabsData: List(),
	plays: List(),
	awardOptions: List(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
	playsLoadingStatus: LoadingStatusEnum.NONE,
	playsLoadingStatusMessage: '',
	// TODO: 之後改用 url 帶 query 的方法完成後，要刪掉 selectedLotteryClassId
	selectedLotteryClassId: null,
});

export default function lotteryPlayBonusStandardManagementPage(state = initialState, action) {
	switch (action.type) {
		case START_INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE: {
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		}
		case INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_SUCCESS: {
			const {
				lotteryClasses,
				lotteriesMap,
			} = action;

			const lotteryClassId = state.get('selectedLotteryClassId') || getFirstLotteryClassId(lotteryClasses);
			const lotteryClassOptions = mapLotteryClassesToOptions(lotteryClasses);
			const lotteryTabsData = mapLotteriesToTabs(lotteriesMap[lotteryClassId + '']);

			return state
				.set('lotteryClassOptions', List(lotteryClassOptions))
				.set('lotteryTabsData', List(lotteryTabsData))
				.set('selectedLotteryClassId', lotteryClassId)
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_FAILED: {
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		}
		case START_FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS:
			return state.set('playsLoadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS_SUCCESS: {
			const awardOptions = getAwardOptions(action.plays);

			return state
				.set('plays', List(action.plays))
				.set('awardOptions', List(awardOptions))
				.set('playsLoadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS_FAILED:
			return state
				.set('playsLoadingStatus', LoadingStatusEnum.FAILED)
				.set('playsLoadingStatusMessage', action.errorMessage);
		case SET_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_LOTTERY_CLASS_ID: {
			const {
				selectedLotteryClassId,
				lotteries,
			} = action;
			const lotteryTabsData = mapLotteriesToTabs(lotteries);

			return state
				.set('lotteryTabsData', List(lotteryTabsData))
				.set('selectedLotteryClassId', selectedLotteryClassId);
		}
		// TODO: 之後改用 url 帶 query 的方法完成後，要刪掉 RESET_LOTTERY_CLASS_ID
		case RESET_LOTTERY_CLASS_ID:
			return state.set('selectedLotteryClassId', null);

		default: {
			return state;
		}
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

function mapLotteriesToTabs(lotteries = []) {
	return lotteries.map(lottery => ({
		id: lottery.id,
		key: '' + lottery.id,
		tab: lottery.name,
	}));
}

function getAwardOptions(plays) {
	return plays
		.reduce((reduced, item) => reduced = reduced.includes(item.award.name) ? reduced : [...reduced, item.award.name ], [])
		.map(_data => ({
			label: _data,
			value: _data,
		}));
}

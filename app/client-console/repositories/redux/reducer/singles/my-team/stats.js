import { Map, } from 'immutable';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_TEAM_STATS,
	FETCH_TEAM_STATS_SUCCESS,
	FETCH_TEAM_STATS_FAILED,
} = actionTypes;

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

/*
Example:
{
	id: 12,
	userId: 12,
	username: "test01",
	numOfUsers: 2, // 團隊總人數
	numOfZeroBalanceUsers: 0, // 餘額為 0 的會員人數
	numOfNonZeroBalanceUsers: 2, // 有餘額會員人數
	balance: 19054, // 團隊總餘額
	depositAmount: 0,
	withdrawalAmount: 0,
	createdAt: "2020-03-06T05:47:39.000Z",
	updatedAt: "2020-03-06T05:53:30.000Z",
	numOfBettingUsers: 1,
	numOfEffectiveBettingUsers: 1,
	teamBonusStatses: [ // 獎金號人數分佈
		{
			deltaBonus: -4,
			numOfUsers: 1
		},
		{
			deltaBonus: -2,
			numOfUsers: 1
		}
	],
	teamDailyStatses: [ // 近 10 天數據
		{
			date: "2020-03-06",
			numOfRegistries: 0, // 今日註冊人數
			numOfBettingUsers: 1, // 今日投注人數
			numOfEffectiveBettingUsers: 1 // 今日有效投注人數
		}
	],
	today: "2020-03-06"
}
*/

const initialState = Map({
	data: Map(),

	loadingStatus: NONE,
	loadingStatusMessage: '',
});

export default function teamStats(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_TEAM_STATS:
			return state.set('loadingStatus', LOADING);
		case FETCH_TEAM_STATS_SUCCESS: 
			return state
				.set('data', Map(action.teamStats))
				.set('loadingStatus', SUCCESS);
		case FETCH_TEAM_STATS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

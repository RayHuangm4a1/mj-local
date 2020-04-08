import { Map, } from 'immutable';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_TEAM_BETTING_RECORDS,
	FETCH_TEAM_BETTING_RECORDS_SUCCESS,
	FETCH_TEAM_BETTING_RECORDS_FAILED,
} = actionTypes;

/* Example
data: Map{(
	teamBettingRecords: [
		{
			id: 1,
			userId: 1,
			username: 'test01',
			walletCode: 23,
			type: 1,
			traceId: 0,
			lotteryClassId: 1,
			lotteryId: 0,
			lotteryName: '腾讯分分彩',
			playId: 1,
			unit: 2,
			awards: {
				小: {
					deltaBonus: 0,
					numerator: 1,
					denominator: 2
					pk: { count: 0, isEnabled: false, },
				}
			},
			name: "整合 小",
			bonus: 1956,
			rebate: 0,
			issue: 20191118671,
			opencode: "",
			reward: 0,
			amountPerBet: 10,
			multiple: 2,
			count: 1,
			amount: 1,
			betcontent: "小",
			weizhi: "",
			isPK: false,
			status: 0,
			details: [
				{
					name: "和",
					count: 1,
					reward: 10
				}
			],
			device: "unknown",
			error: null,
			oid: 0,
			pid: 2,
			openedAt: "2019-10-23T02:21:55.000Z",
			createdAt: "2019-10-23T02:20:59.000Z",
			updatedAt: "2019-10-23T02:20:59.000Z"
		},
		// ...
	],
	page: 1,
	numOfItems: 0,
	numOfPages: 1,
}),
*/

const initialState = Map({
	data: Map(),
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function teamBettingRecords(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_TEAM_BETTING_RECORDS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_TEAM_BETTING_RECORDS_SUCCESS:
		{
			const {
				page,
				numOfItems,
				numOfPages,
				data: teamBettingRecords,
			} = action;

			return state
				.set('data', Map({
					page,
					numOfItems,
					numOfPages,
					teamBettingRecords,
				}))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_TEAM_BETTING_RECORDS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

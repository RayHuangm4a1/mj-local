import { Map, List } from 'immutable';
import uuid from 'uuid';
import Big from 'big.js';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_TEAM_REPORTS,
	FETCH_TEAM_REPORTS_SUCCESS,
	FETCH_TEAM_REPORTS_SUCCESS_FAILED,
} = actionTypes;

// Example:
// {
// 	"data": {
// 		"stats": [
// 			{
// 				"id": 1,
// 				"userId": 12,
// 				"username": "test01",
// 				"walletCode": 100,
// 				"date": "2019-11-14",
// 				"bettingAmount": 24000,
// 				"bettingReward": 17000,
// 				"depositAmount": 0,
// 				"withdrawalAmount": 0,
// 				"rebateAmount": 3048,
// 				"activityAmount": 0,
// 				"fixedWageAmount": 432,
// 				"dividendAmount": 0,
// 				"incentiveAmount": 0,
// 				"createdAt": "2019-11-15T05:30:12.000Z",
// 				"updatedAt": "2019-11-15T05:49:12.000Z"
// 			},
// 		],
// 		"ancestors": [
// 			{
// 				"id": 12,
// 				"username": "test01"
// 			}
// 		]
// 	}
// }

const initialState = Map({
	data: Map({
		stats: List(),
		ancestors: List(),
	}),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function teamReports(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_TEAM_REPORTS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_TEAM_REPORTS_SUCCESS: {
			const { stats, ancestors } = action.teamReports;

			return state
				.setIn(['data', 'stats'], List(generateStatsDataWithTotal(stats)))
				.setIn(['data', 'ancestors'], List(ancestors))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_TEAM_REPORTS_SUCCESS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

function generateStatsDataWithTotal(statsData) {
	const totalData = statsData.reduce((reduced, current) => {
		return {
			bettingAmount: reduced.bettingAmount.plus(new Big(current.bettingAmount)),
			bettingReward: reduced.bettingReward.plus(new Big(current.bettingReward)),
			depositAmount: reduced.depositAmount.plus(new Big(current.depositAmount)),
			withdrawalAmount: reduced.withdrawalAmount.plus(new Big(current.withdrawalAmount)),
			rebateAmount: reduced.rebateAmount.plus(new Big(current.rebateAmount)),
			activityAmount: reduced.activityAmount.plus(new Big(current.activityAmount)),
			fixedWageAmount: reduced.fixedWageAmount.plus(new Big(current.fixedWageAmount)),
			dividendAmount: reduced.dividendAmount.plus(new Big(current.dividendAmount)),
			incentiveAmount: reduced.incentiveAmount.plus(new Big(current.incentiveAmount)),
		};
	}, {
		bettingAmount: new Big(0),
		bettingReward: new Big(0),
		depositAmount: new Big(0),
		withdrawalAmount: new Big(0),
		rebateAmount: new Big(0),
		activityAmount: new Big(0),
		fixedWageAmount: new Big(0),
		dividendAmount: new Big(0),
		incentiveAmount: new Big(0),
	});

	const totalRowData = {
		id: uuid(),
		username: '总计',
		bettingAmount: parseFloat(totalData.bettingAmount),
		bettingReward: parseFloat(totalData.bettingReward),
		depositAmount: parseFloat(totalData.depositAmount),
		withdrawalAmount: parseFloat(totalData.withdrawalAmount),
		rebateAmount: parseFloat(totalData.rebateAmount),
		activityAmount: parseFloat(totalData.activityAmount),
		fixedWageAmount: parseFloat(totalData.fixedWageAmount),
		dividendAmount: parseFloat(totalData.dividendAmount),
		incentiveAmount: parseFloat(totalData.incentiveAmount),
	};

	const teamStats = [totalRowData, ...statsData.slice()];

	return teamStats;
}

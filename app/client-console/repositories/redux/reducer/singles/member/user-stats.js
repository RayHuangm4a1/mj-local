import { Map, List, } from 'immutable';
import Big from 'big.js';
import uuid from 'uuid';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_USER_STATS,
	FETCH_USER_STATS_SUCCESS,
	FETCH_USER_STATS_FAILED,
} = actionTypes;

/* Example
data: List([
	{
		"id": 1,
		"userId": 12,
		"username": "test01",
		"walletCode": 100,
		"date": "2019-11-15",
		"bettingAmount": 6000,
		"bettingReward": 3400,
		"depositAmount": 0,
		"withdrawalAmount": 0,
		"rebateAmount": 790,
		"activityAmount": 0,
		"fixedWageAmount": 164,
		"dividendAmount": 0,
		"incentiveAmount": 0,
		"createdAt": "2019-11-15T05:30:12.000Z",
		"updatedAt": "2019-11-15T06:08:24.000Z"
	},
	...
]),
*/

const initialState = Map({
	data: List(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function userStats(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_STATS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_USER_STATS_SUCCESS:
			return state
				.set('data', List(generateStatsDataWithTotal(action.userStats)))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_USER_STATS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

function generateStatsDataWithTotal(currentData) {
	const totalData = currentData.reduce(function (reduced, current) {
		return {
			bettingAmount: reduced.bettingAmount.plus(current.bettingAmount),
			bettingReward: reduced.bettingReward.plus(current.bettingReward),
			depositAmount: reduced.depositAmount.plus(current.depositAmount),
			fixedWageAmount: reduced.fixedWageAmount.plus(current.fixedWageAmount),
			activityAmount: reduced.activityAmount.plus(current.activityAmount),
			withdrawalAmount: reduced.withdrawalAmount.plus(current.withdrawalAmount),
			rebateAmount: reduced.rebateAmount.plus(current.rebateAmount),
			incentiveAmount: reduced.incentiveAmount.plus(current.incentiveAmount),
		};
	}, {
		bettingAmount: new Big(0),
		bettingReward: new Big(0),
		depositAmount: new Big(0),
		fixedWageAmount: new Big(0),
		activityAmount: new Big(0),
		withdrawalAmount: new Big(0),
		rebateAmount: new Big(0),
		incentiveAmount: new Big(0),
	});

	let resultData = currentData.slice();

	resultData.unshift({
		id: uuid(),
		date: '汇总',
		bettingAmount: parseFloat(totalData.bettingAmount),
		bettingReward: parseFloat(totalData.bettingReward),
		depositAmount: parseFloat(totalData.depositAmount),
		fixedWageAmount: parseFloat(totalData.fixedWageAmount),
		activityAmount: parseFloat(totalData.activityAmount),
		withdrawalAmount: parseFloat(totalData.withdrawalAmount),
		rebateAmount: parseFloat(totalData.rebateAmount),
		incentiveAmount: parseFloat(totalData.incentiveAmount),
	});
	return resultData;
}

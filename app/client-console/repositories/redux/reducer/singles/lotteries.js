import { Map, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';

const {
	START_FETCH_LOTTERIES,
	FETCH_LOTTERIES_SUCCESS,
	FETCH_LOTTERIES_FAILED,
} = actionTypes;

/* Example
lotteriesData:
{
	"0": [
		{
			_id: "_id",
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
			],
			tags: [
				{
					id: 1,
					name: "熱門標籤",
					code: "hot",
				},
			],
			id: 0,
			name: "重庆时时彩",
			code: "cqssc",
			numOfIssues: 59,
			status: "online",
			ordering: 6,
		},
		...
	]
}

lotteriesMapData:
{
	"dj1.5fc": {
		_id: "_id",
		id: 12,
		name: "东京1.5分彩",
		code: "dj1.5fc",
		lotteryClass: {
			_id: "_id",
			id: 0,
			name: "时时彩",
			code: "ssc",
			status: "online"
		},
		playClasses: [
			{
				id: "id",
				name: "官方",
				code: "standard",
			},
		],
		numOfIssues: 920,
		status: "online",
		ordering: 6,
	},
	"dj1.5fc": {...},
	...
}
*/

const initialState = Map({
	lotteriesData: Map(),
	lotteriesMapData: Map(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function lotteries(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_LOTTERIES:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_LOTTERIES_SUCCESS:
		{
			const lotteries = action.lotteries;

			return state
				.set('lotteriesData', Map(groupBy(sortLotteries(lotteries), item => item.lotteryClass && item.lotteryClass.id)))
				.set('lotteriesMapData', Map(keyBy(sortLotteries(lotteries), item => item.id)))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_LOTTERIES_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

function sortLotteries(lotteries) {
	return lotteries.sort((a, b) => a.id - b.id);
}

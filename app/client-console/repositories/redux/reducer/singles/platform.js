import { List, Map } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_FETCH_PLATFORM,
	FETCH_PLATFORM_SUCCESS,
	FETCH_PLATFORM_FAILED,
} = actionTypes;

/* Example
data:
{
	"id": 1,
	"_id": "5cd151312dfa1d244dd54517",
	"status": "online",
	"name": "麥傑",
	"code": "mj",
	"bonus": {
		"max": 1956,
		"min": 1700,
		"list": [1956, 1940, 1920, 1900], 獎金號白名單(奖金号间隔)
	},
	"couldEqualToPlatformMaxBonus": true, 最高奖金号是否可设定平级
	"couldEqualToParentBonus": false, 其他奖金号是否可设定平级
	"rewardMode": "奖金模式",
	"nonPKMaxProfit": 500000,
	"pkMaxProfit": 10000,
	"fixedWages": [
		2,
		1.8,
		1.6,
		1.4,
		1.2
	],
	"createdAt": "2019-07-12T03:15:56.804Z",
	"updatedAt": "2019-07-12T03:15:56.804Z",
};
*/

const initialState = Map({
	data: Map(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function platform(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_PLATFORM:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_PLATFORM_SUCCESS:
			return state
				.set('data', Map(action.platform))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_PLATFORM_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

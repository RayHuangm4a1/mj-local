import { Map, } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	START_FETCH_USER_STATS,
	FETCH_USER_STATS_SUCCESS,
	FETCH_USER_STATS_FAILED,
} = actionTypes;

/* example
data: Map({
	id: 12,
	userId: 12,
	username: "test01",
	walletCode: 100,
	numOfDeposits: 0,
	depositAmount: 0,
	maxAmountPerDeposit: 0,
	bettingAmount: 0,
	numOfWithdraws: 0,
	withdrawalAmount: 0,
	damaAmount: 0,

	createdAt: "2020-02-10T10:21:28.000Z",
	updatedAt: "2020-02-10T10:21:28.000Z"
})
*/

const initialState = Map({
	data: Map(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: ''
});

export default function stats(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_STATS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_USER_STATS_SUCCESS:
			return state
				.set('data', Map(action.stats))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_USER_STATS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

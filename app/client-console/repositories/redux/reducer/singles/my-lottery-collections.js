import { Map, List, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;
const {
	START_FETCH_MY_LOTTERY_COLLECTIONS,
	FETCH_MY_LOTTERY_COLLECTIONS_SUCCESS,
	FETCH_MY_LOTTERY_COLLECTIONS_FAILED,
	START_UPDATE_MY_LOTTERY_COLLECTIONS,
	UPDATE_MY_LOTTERY_COLLECTIONS_SUCCESS,
	UPDATE_MY_LOTTERY_COLLECTIONS_FAILED,
} = actionTypes;

/* Example
Map({
	collectionIdsData: List([
		12, // 有序, lotteryId
		4,
		...
	]),
	collectionsData: List([
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
	]),

	loadingStatus: NONE,
	loadingStatusMessage: '',
	updateLoadingStatus: NONE,
	updateLoadingStatusMessage: '',
})
*/

const initialState = Map({
	collectionIdsData: List(),
	collectionsData: List(),

	loadingStatus: NONE,
	loadingStatusMessage: '',
	updateLoadingStatus: NONE,
	updateLoadingStatusMessage: '',
});

export default function myLotteryCollections(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_MY_LOTTERY_COLLECTIONS:
			return state.set('loadingStatus', LOADING);
		case FETCH_MY_LOTTERY_COLLECTIONS_SUCCESS:
			return state
				.set('collectionIdsData', List(action.collectionIds))
				.set('collectionsData', List(action.collections))
				.set('loadingStatus', SUCCESS);
		case FETCH_MY_LOTTERY_COLLECTIONS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_UPDATE_MY_LOTTERY_COLLECTIONS:
			return state.set('updateLoadingStatus', LOADING);
		case UPDATE_MY_LOTTERY_COLLECTIONS_SUCCESS:
			return state
				.set('collectionIdsData', List(action.updatedCollectionIds))
				.set('collectionsData', List(action.updatedCollections))
				.set('updateLoadingStatus', SUCCESS);
		case UPDATE_MY_LOTTERY_COLLECTIONS_FAILED:
			return state
				.set('updateLoadingStatus', FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

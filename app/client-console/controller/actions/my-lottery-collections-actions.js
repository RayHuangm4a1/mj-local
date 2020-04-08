import {
	START_FETCH_MY_LOTTERY_COLLECTIONS,
	FETCH_MY_LOTTERY_COLLECTIONS_SUCCESS,
	FETCH_MY_LOTTERY_COLLECTIONS_FAILED,
	START_UPDATE_MY_LOTTERY_COLLECTIONS,
	UPDATE_MY_LOTTERY_COLLECTIONS_SUCCESS,
	UPDATE_MY_LOTTERY_COLLECTIONS_FAILED,
} from './action-types';

export function fetchMyLotteryCollectionsAction() {
	return {
		type: START_FETCH_MY_LOTTERY_COLLECTIONS,
	};
}
export function fetchMyLotteryCollectionsSuccessAction(collectionIds, collections) {
	return {
		type: FETCH_MY_LOTTERY_COLLECTIONS_SUCCESS,
		collectionIds,
		collections,
	};
}
export function fetchMyLotteryCollectionsFailedAction(error, errorMessage) {
	return {
		type: FETCH_MY_LOTTERY_COLLECTIONS_FAILED,
		error,
		errorMessage,
	};
}

export function updateMyLotteryCollectionsAction(collectionIds) {
	return {
		type: START_UPDATE_MY_LOTTERY_COLLECTIONS,
		collectionIds,
	};
}
export function updateMyLotteryCollectionsSuccessAction(updatedCollectionIds, updatedCollections) {
	return {
		type: UPDATE_MY_LOTTERY_COLLECTIONS_SUCCESS,
		updatedCollectionIds,
		updatedCollections,
	};
}
export function updateMyLotteryCollectionsFailedAction(error, errorMessage) {
	return {
		type: UPDATE_MY_LOTTERY_COLLECTIONS_FAILED,
		error,
		errorMessage,
	};
}

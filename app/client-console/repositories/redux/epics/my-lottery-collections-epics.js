import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
	debounceTime,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../lib/general-utils';
import {
	actionTypes,
	myLotteryCollectionsActions,
} from '../../../controller';

const {
	START_FETCH_MY_LOTTERY_COLLECTIONS,
	START_UPDATE_MY_LOTTERY_COLLECTIONS,
} = actionTypes;
const {
	fetchMyLotteryCollectionsSuccessAction,
	fetchMyLotteryCollectionsFailedAction,
	updateMyLotteryCollectionsSuccessAction,
	updateMyLotteryCollectionsFailedAction,
} = myLotteryCollectionsActions;

const DEBOUNCE_TIME = 300;

export function fetchMyLotteryCollectionsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_MY_LOTTERY_COLLECTIONS),
		switchMap(() => (
			rxjsApiFetcher
				.get('users/id=me/lotteries')
				.pipe(
					map(({ response: collectionIds, }) => {
						const {
							lotteries: lotteriesReducer,
						} = state$.value;
						const lotteriesMapData = lotteriesReducer.get('lotteriesMapData').toObject();
						const collections = mapLotteriesToCollections(collectionIds, lotteriesMapData);

						return fetchMyLotteryCollectionsSuccessAction(collectionIds, collections);
					}),
					catchError(error => catchErrorMessageForEpics(error, fetchMyLotteryCollectionsFailedAction)),
				)
		)),
	);
}

export function updateMyLotteryCollectionsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_MY_LOTTERY_COLLECTIONS),
		debounceTime(DEBOUNCE_TIME),
		switchMap(({ collectionIds, }) => (
			rxjsApiFetcher
				.put('users/id=me/lotteries', collectionIds)
				.pipe(
					map(() => {
						const {
							lotteries: lotteriesReducer,
						} = state$.value;
						const lotteriesMapData = lotteriesReducer.get('lotteriesMapData').toObject();
						const collections = mapLotteriesToCollections(collectionIds, lotteriesMapData);

						return updateMyLotteryCollectionsSuccessAction(collectionIds, collections);
					}),
					catchError(error => catchErrorMessageForEpics(error, updateMyLotteryCollectionsFailedAction)),
				)
		)),
	);
}

const mapLotteriesToCollections = (collectionIds, lotteriesMapData = {}) => {
	if (!collectionIds || !collectionIds.length) {
		return [];
	}

	return collectionIds
		.filter(id => lotteriesMapData[id])
		.map(id => lotteriesMapData[id]);
};

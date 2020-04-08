import { ofType } from 'redux-observable';
import { zip, } from 'rxjs';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	lotteryClassesAndLotteriesActions,
} from '../../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	START_FETCH_LOTTERY_CLASSES_AND_LOTTERIES,
	START_UPDATE_LOTTERY_STATUS,
	START_UPDATE_LOTTERY_CLASS_STATUS,
	START_UPDATE_LOTTERIES_ORDERING_AND_HOTTAG,
} = actionTypes;

const {
	fetchLotteryClassesAndLotteriesSuccessAction,
	fetchLotteryClassesAndLotteriesFailedAction,
	updateLotteriesOrderingAndHotTagSuccessAction,
	updateLotteriesOrderingAndHotTagFailedAction,
	updateLotteryStatusSuccessAction,
	updateLotteryStatusFailedAction,
	updateLotteryClassStatusSuccessAction,
	updateLotteryClassStatusFailedAction,
} = lotteryClassesAndLotteriesActions;

export function fetchLotteryClassesAndLotteriesEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERY_CLASSES_AND_LOTTERIES),
		switchMap(() => (
			zip(
				rxjsApiFetcher.get('lottery-classes'),
				rxjsApiFetcher.get('lotteries'),
			).pipe(
				map(payload => {
					const [
						lotteryClasses,
						lotteries,
					] = payload;

					return fetchLotteryClassesAndLotteriesSuccessAction({
						lotteryClasses: lotteryClasses.response,
						lotteries: lotteries.response
					});
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchLotteryClassesAndLotteriesFailedAction))
			)
		))
	);
}

export function updateLotteryStatusEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_LOTTERY_STATUS),
		switchMap(({
			lotteryId,
			status,
		}) => (
			rxjsApiFetcher.put(`lotteries/id=${lotteryId}/status`, { status, })
				.pipe(
					map(() => updateLotteryStatusSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, updateLotteryStatusFailedAction)),
				)
		)),
	);
}

export function updateLotteryClassStatusEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_LOTTERY_CLASS_STATUS),
		switchMap(({
			lotteryClassId,
			status,
		}) => (
			rxjsApiFetcher.put(`lottery-classes/id=${lotteryClassId}/status`, { status, })
				.pipe(
					map(() => updateLotteryClassStatusSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, updateLotteryClassStatusFailedAction)),
				)
		)),
	);
}

export function updateLotteriesOrderingAndHotTagEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_LOTTERIES_ORDERING_AND_HOTTAG),
		switchMap(({
			lotteryClassId,
			lotteriesOrderingAndHotTagData,
		}) => (
			rxjsApiFetcher.patch(`lottery-classes/id=${lotteryClassId}/lotteries`, lotteriesOrderingAndHotTagData)
				.pipe(
					map(() => updateLotteriesOrderingAndHotTagSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, updateLotteriesOrderingAndHotTagFailedAction)),
				)
		)),
	);
}

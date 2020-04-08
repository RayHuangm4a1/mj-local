import { ofType } from 'redux-observable';
import {
	of,
	race,
	concat,
	zip,
} from 'rxjs';
import {
	take,
	map,
	switchMap,
	mergeMap,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	lotteryPlayManagementPageActions,
	lotteryClassesAndLotteriesActions,
	lotteryPlaysActions,
	lotteryPlayConditionsActions,
} from '../../../../controller';

const {
	START_INIT_LOTTERY_PLAY_MANAGEMENT_PAGE,
	START_FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED,
	FETCH_LOTTERY_PLAYS_SUCCESS,
	FETCH_LOTTERY_PLAYS_FAILED,
	FETCH_LOTTERY_PLAY_CONDITIONS_SUCCESS,
	FETCH_LOTTERY_PLAY_CONDITIONS_FAILED,
} = actionTypes;

const {
	initLotteryPlayManagementPageSuccessAction,
	initLotteryPlayManagementPageFailedAction,
	fetchLotteryPlayManagementPagePlaysSuccessAction,
	fetchLotteryPlayManagementPagePlaysFailedAction,
} = lotteryPlayManagementPageActions;

const {
	fetchLotteryClassesAndLotteriesAction,
} = lotteryClassesAndLotteriesActions;

const {
	fetchLotteryPlaysAction,
} = lotteryPlaysActions;

const {
	fetchLotteryPlayConditionsAction,
} = lotteryPlayConditionsActions;

export function initLotteryPlayManagementPageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INIT_LOTTERY_PLAY_MANAGEMENT_PAGE),
		switchMap(() =>
			concat(
				of(fetchLotteryClassesAndLotteriesAction()),
				race(
					action$.pipe(
						ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS),
						take(1),
						map((action) => {
							const {
								value: { lotteryClassesAndLotteries, },
							} = state$;
							const lotteriesMap = lotteryClassesAndLotteries.get('lotteriesMap').toObject();

							return initLotteryPlayManagementPageSuccessAction(action.payload.lotteryClasses, lotteriesMap);
						})
					),
					action$.pipe(
						ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED),
						take(1),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, initLotteryPlayManagementPageFailedAction))
					)
				)
			),
		)
	);
}

export function fetchLotteryPlayManagementPagePlaysEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERY_PLAY_MANAGEMENT_PAGE_PLAYS),
		switchMap(({ lotteryId, playClassId }) =>
			concat(
				of(fetchLotteryPlaysAction(lotteryId, playClassId)),
				of(fetchLotteryPlayConditionsAction(lotteryId, playClassId)),
				race(
					zip(
						action$.ofType(FETCH_LOTTERY_PLAYS_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_LOTTERY_PLAY_CONDITIONS_SUCCESS).pipe(take(1)),
					).pipe(
						map(() => fetchLotteryPlayManagementPagePlaysSuccessAction())
					),
					action$.pipe(
						ofType(FETCH_LOTTERY_PLAYS_FAILED),
						take(1),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, fetchLotteryPlayManagementPagePlaysFailedAction))
					),
					action$.pipe(
						ofType(FETCH_LOTTERY_PLAY_CONDITIONS_FAILED),
						take(1),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, fetchLotteryPlayManagementPagePlaysFailedAction))
					)
				)
			),
		)
	);
}

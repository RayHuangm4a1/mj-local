import { ofType, } from 'redux-observable';
import { interval, } from 'rxjs';
import {
	of,
	race,
	concat,
} from 'rxjs';
import {
	take,
	map,
	mergeMap,
	switchMap,
	startWith,
	takeUntil,
} from 'rxjs/operators';
import {
	actionTypes,
	lotteryDrawingManagementPageActions,
	lotteryClassesAndLotteriesActions,
	lotteryDrawingsActions,
} from '../../../../controller';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';

const {
	START_INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED,
	START_UPDATE_DRAWING_INTERVAL,
	STOP_UPDATE_DRAWING_INTERVAL,
} = actionTypes;

const {
	initLotteryDrawingManagementPageSuccessAction,
	initLotteryDrawingManagementPageFailedAction,
} = lotteryDrawingManagementPageActions;

const { fetchLotteryDrawingsAction, } = lotteryDrawingsActions;

const { fetchLotteryClassesAndLotteriesAction, } = lotteryClassesAndLotteriesActions;

export function initLotteryDrawingManagementPageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INIT_LOTTERY_DRAWING_MANAGEMENT_PAGE),
		mergeMap(() =>
			concat(
				of(fetchLotteryClassesAndLotteriesAction()),
				race(
					action$.ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS).pipe(
						take(1),
						map(() => initLotteryDrawingManagementPageSuccessAction()),
					),
					action$.ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initLotteryDrawingManagementPageFailedAction)),
					),
				),
			),
		),
	);
}

export function updateLotteryDrawingsIntervalEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_DRAWING_INTERVAL),
		switchMap(action => (
			interval(action.interval * 1000).pipe(
				startWith(0),
				takeUntil(
					action$.pipe(ofType(STOP_UPDATE_DRAWING_INTERVAL))
				),
				map(() => fetchLotteryDrawingsAction(action.lotteryId)),
			)
		))
	);
}

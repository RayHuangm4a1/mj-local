import { ofType, } from 'redux-observable';
import {
	of,
	race,
	concat,
} from 'rxjs';
import {
	take,
	map,
	mergeMap
} from 'rxjs/operators';
import {
	actionTypes,
	lotteryClassManagementPageActions,
	lotteryClassesAndLotteriesActions,
} from '../../../../controller';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';

const {
	START_INIT_LOTTERY_CLASS_MANAGEMENT_PAGE,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED,
} = actionTypes;

const {
	initLotteryClassManagementPageSuccessAction,
	initLotteryClassManagementPageFailedAction,
} = lotteryClassManagementPageActions;

const { fetchLotteryClassesAndLotteriesAction, } = lotteryClassesAndLotteriesActions;

export function initLotteryClassManagementPageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INIT_LOTTERY_CLASS_MANAGEMENT_PAGE),
		mergeMap(() =>
			concat(
				of(fetchLotteryClassesAndLotteriesAction()),
				race(
					action$.ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS).pipe(
						take(1),
						map(() => initLotteryClassManagementPageSuccessAction()),
					),
					action$.ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initLotteryClassManagementPageFailedAction)),
					),
				),
			),
		),
	);
}

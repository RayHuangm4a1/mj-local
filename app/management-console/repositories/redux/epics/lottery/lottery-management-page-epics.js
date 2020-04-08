import { ofType } from 'redux-observable';
import {
	of,
	race,
	concat,
} from 'rxjs';
import {
	map,
	switchMap,
	take,
} from 'rxjs/operators';
import {
	actionTypes,
	lotteryManagementPageActions,
	lotteryClassesAndLotteriesActions,
} from '../../../../controller';

const {
	START_INIT_LOTTERY_MANAGEMENT_PAGE,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED,
} = actionTypes;

const {
	initLotteryManagementPageSuccessAction,
	initLotteryManagementPageFailedAction,
} = lotteryManagementPageActions;

const {
	fetchLotteryClassesAndLotteriesAction,
} = lotteryClassesAndLotteriesActions;

export function initLotteryManagementPageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INIT_LOTTERY_MANAGEMENT_PAGE),
		switchMap(() =>
			concat(
				of(fetchLotteryClassesAndLotteriesAction()),
				race(
					action$.pipe(
						ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS),
						take(1),
						map(() => {
							const lotteryClass = state$.value.lotteryClassesAndLotteries.get('lotteryClasses');

							return  initLotteryManagementPageSuccessAction(lotteryClass);
						})
					),
					action$.pipe(
						ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED),
						take(1),
						map(payload => initLotteryManagementPageFailedAction(payload.error, payload.errorMessage))
					)
				)
			),
		)
	);
}

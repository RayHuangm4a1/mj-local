import { ofType } from 'redux-observable';
import {
	of,
	race,
	concat,
} from 'rxjs';
import {
	map,
	mergeMap,
	switchMap,
	take,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	lotterySpecialManagementActions,
	lotteryClassesAndLotteriesActions,
} from '../../../../controller';

const {
	START_INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED,
} = actionTypes;

const {
	initLotterySpecialManagementPageSuccessAction,
	initLotterySpecialManagementPageFailedAction,
} = lotterySpecialManagementActions;

const {
	fetchLotteryClassesAndLotteriesAction,
} = lotteryClassesAndLotteriesActions;

export function initLotterySpecialManagementPageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INIT_LOTTERY_SPECIAL_MANAGEMENT_PAGE),
		switchMap(() =>
			concat(
				of(fetchLotteryClassesAndLotteriesAction()),
				race(
					action$.pipe(
						ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS),
						map(() => initLotterySpecialManagementPageSuccessAction())
					).pipe(take(1)),
					action$.pipe(
						ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, initLotterySpecialManagementPageFailedAction)),
					).pipe(take(1))
				)
			),
		)
	);
}

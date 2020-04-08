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
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	lotteryPlayBonusXinyongManagementPageActions,
	lotteryClassesAndLotteriesActions,
} from '../../../../controller';

const {
	START_INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED,
} = actionTypes;

const {
	initLotteryPlayBonusXinyongManagementPageSuccessAction,
	initLotteryPlayBonusXinyongManagementPageFailedAction,
} = lotteryPlayBonusXinyongManagementPageActions;

const {
	fetchLotteryClassesAndLotteriesAction,
} = lotteryClassesAndLotteriesActions;

export function initLotteryPlayBonusXinyongManagementPageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INIT_LOTTERY_PLAY_BONUS_XINYONG_MANAGEMENT_PAGE),
		switchMap(() =>
			concat(
				of(fetchLotteryClassesAndLotteriesAction()),
				race(
					action$.pipe(
						ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS),
						map(() => {
							const {
								value: { lotteryClassesAndLotteries, },
							} = state$;
							const lotteryClasses = lotteryClassesAndLotteries.get('lotteryClasses').toArray();
							const lotteriesMap = lotteryClassesAndLotteries.get('lotteriesMap').toObject();

							return initLotteryPlayBonusXinyongManagementPageSuccessAction(lotteryClasses, lotteriesMap);
						})
					).pipe(take(1)),
					action$.pipe(
						ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, initLotteryPlayBonusXinyongManagementPageFailedAction)),
					).pipe(take(1))
				)
			),
		)
	);
}

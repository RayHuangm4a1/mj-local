import { ofType } from 'redux-observable';
import {
	of,
	race,
	concat,
	zip,
} from 'rxjs';
import {
	map,
	switchMap,
	mergeMap,
	take,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	lotteryPlayBonusStandardManagementPageActions,
	lotteryClassesAndLotteriesActions,
	lotteryPlaysActions,
	lotteryPlayConditionsActions,
} from '../../../../controller';
import { calculateBonus, } from '../../../../../lib/bonus-utils';

const {
	START_INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_SUCCESS,
	FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED,
	START_FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS,
	FETCH_LOTTERY_PLAYS_SUCCESS,
	FETCH_LOTTERY_PLAYS_FAILED,
	FETCH_LOTTERY_PLAY_CONDITIONS_SUCCESS,
	FETCH_LOTTERY_PLAY_CONDITIONS_FAILED,
} = actionTypes;

const {
	initLotteryPlayBonusStandardManagementPageSuccessAction,
	initLotteryPlayBonusStandardManagementPageFailedAction,
	fetchLotteryPlayBonusStandardManagementPagePlaysSuccessAction,
	fetchLotteryPlayBonusStandardManagementPagePlaysFailedAction,
} = lotteryPlayBonusStandardManagementPageActions;

const {
	fetchLotteryClassesAndLotteriesAction,
} = lotteryClassesAndLotteriesActions;

const {
	fetchLotteryPlaysAction,
} = lotteryPlaysActions;

const {
	fetchLotteryPlayConditionsAction,
} = lotteryPlayConditionsActions;

export function initLotteryPlayBonusStandardManagementPageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INIT_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE),
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

							return initLotteryPlayBonusStandardManagementPageSuccessAction(action.payload.lotteryClasses, lotteriesMap);
						})
					),
					action$.pipe(
						ofType(FETCH_LOTTERY_CLASSES_AND_LOTTERIES_FAILED),
						take(1),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, initLotteryPlayBonusStandardManagementPageFailedAction)),
					),
				)
			),
		)
	);
}

export function fetchLotteryPlayBonusStandardManagementPagePlaysEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERY_PLAY_BONUS_STANDARD_MANAGEMENT_PAGE_PLAYS),
		switchMap(({ lotteryId, playClassId }) =>
			concat(
				of(fetchLotteryPlaysAction(lotteryId, playClassId)),
				of(fetchLotteryPlayConditionsAction(lotteryId, playClassId)),
				race(
					zip(
						action$.ofType(FETCH_LOTTERY_PLAYS_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_LOTTERY_PLAY_CONDITIONS_SUCCESS).pipe(take(1)),
					).pipe(
						map(() => {
							const platform = state$.value.platform.get('data').toObject();
							const plays = state$.value.lotteryPlays.get('plays').toArray();

							const platformMaxBonus = platform.bonus ? platform.bonus.max : 0;
							const flattenPlayData = flattenPlays(plays, platformMaxBonus);

							return fetchLotteryPlayBonusStandardManagementPagePlaysSuccessAction(flattenPlayData);
						})
					),
					action$.pipe(
						ofType(FETCH_LOTTERY_PLAYS_FAILED),
						take(1),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, fetchLotteryPlayBonusStandardManagementPagePlaysFailedAction))
					),
					action$.pipe(
						ofType(FETCH_LOTTERY_PLAY_CONDITIONS_FAILED),
						take(1),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, fetchLotteryPlayBonusStandardManagementPagePlaysFailedAction))
					)
				)
			),
		)
	);
}

function flattenPlays(data = [], platformMaxBonus) {
	const flattenPlaysData = [];

	data.forEach(item => {
		const awardKeys = Object.keys(item.awards);

		awardKeys.forEach(award => {
			const deltaBonus = item.awards[award].deltaBonus;
			const bonus = calculateBonus(platformMaxBonus, deltaBonus);

			const data = Object.assign({}, item, {
				award: {
					...item.awards[award],
					name: award,
				},
				bonus,
			});

			flattenPlaysData.push(data);
		});
	});
	return flattenPlaysData;
}

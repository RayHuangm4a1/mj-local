import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	lotteryPlaysActions ,
} from '../../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	calculateBonus,
} from '../../../../../lib/bonus-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	START_FETCH_LOTTERY_PLAYS,
	START_UPDATE_LOTTERY_PLAYS_STATUS,
	START_UPDATE_LOTTERY_PLAYS_BONUS,
} = actionTypes;

const {
	fetchLotteryPlaysSuccessAction,
	fetchLotteryPlaysFailedAction,
	updateLotteryPlaysStatusSuccessAction,
	updateLotteryPlaysStatusFailedAction,
	updateLotteryPlaysBonusSuccessAction,
	updateLotteryPlaysBonusFailedAction,
} = lotteryPlaysActions;

export function fetchLotteryPlaysEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERY_PLAYS),
		switchMap((action) => rxjsApiFetcher
			.get(`/lotteries/id=${action.lotteryId}/play-classes/id=${action.playClassId}/plays`)
			.pipe(
				map(({ response, }) => {
					const platform = state$.value.platform.get('data').toObject();
					const platformMaxBonus = platform.bonus ? platform.bonus.max : 0;

					return response.map(data => {
						const bonus = calculateBonus(platformMaxBonus, getPlayDeltaBonus(data));

						return {
							...data,
							bonus,
						};
					});
				}),
				map(plays => fetchLotteryPlaysSuccessAction(plays)),
				catchError(error => catchErrorMessageForEpics(error, fetchLotteryPlaysFailedAction))
			)
		),
	);
}

export function updateLotteryPlaysStatusEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_LOTTERY_PLAYS_STATUS),
		switchMap((action) => rxjsApiFetcher
			.patch(`/lotteries/id=${action.lotteryId}/plays?fields[]=status`, action.plays)
			.pipe(
				map(() => updateLotteryPlaysStatusSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, updateLotteryPlaysStatusFailedAction)),
			)
		)
	);
}

export function updateLotteryPlaysBonusEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_LOTTERY_PLAYS_BONUS),
		switchMap((action) => rxjsApiFetcher
			.patch(`/lotteries/id=${action.lotteryId}/plays?fields[]=deltaBonus&fields[]=pk`, action.plays)
			.pipe(
				map(() => updateLotteryPlaysBonusSuccessAction()),
				catchError((error) => catchErrorMessageForEpics(error, updateLotteryPlaysBonusFailedAction)),
			)
		),
	);
}

function getPlayDeltaBonus(play) {
	const { awards = {} } = play;
	const awardKey = Object.keys(awards)[0];
	const { deltaBonus } = awards[awardKey];

	return deltaBonus;
}

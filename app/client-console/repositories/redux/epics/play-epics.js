import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	playActions,
} from '../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	calculatePlaysBonusByUser,
	calculateOdds,
} from '../../../../lib/bonus-utils';
import { rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_FETCH_PLAYS,
} = actionTypes;
const {
	fetchPlaysSuccessAction,
	fetchPlaysFailedAction,
} = playActions;

export function fetchPlaysEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_PLAYS),
		switchMap(action => rxjsApiFetcher
			.get(`lotteries/id=${action.lotteryId}/plays`)
			.pipe(
				map(payload => {
					const platformBonusData = state$.value.platform.getIn(['data', 'bonus']);
					const userDeltaBonus = state$.value.user.getIn(['data', 'deltaBonus']);

					return payload.response.map(play => {
						const bonus = calculatePlaysBonusByUser(platformBonusData, userDeltaBonus, play.awards);
						const odds = calculateOdds(play.unit, bonus);

						return Object.assign(play, {
							bonus,
							odds,
						});
					});
				}),
				map(plays => fetchPlaysSuccessAction(plays)),
				catchError(error => catchErrorMessageForEpics(error, fetchPlaysFailedAction)),
			)
		),
	);
}

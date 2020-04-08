import { ofType, } from 'redux-observable';
import {
	map,
	switchMap,
	catchError,
} from 'rxjs/operators';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import {
	actionTypes,
	teamStatsActions,
} from '../../../../controller';
import { calculateBonus } from '../../../../../lib/bonus-utils';

const { START_FETCH_TEAM_STATS } = actionTypes;
const {
	fetchTeamStatsSuccessAction,
	fetchTeamStatsFailedAction,
} = teamStatsActions;

export function fetchTeamStatsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_TEAM_STATS),
		switchMap(() => {
			return rxjsApiFetcher
				.get('teams/leaderId=me/stats')
				.pipe(
					map(({ response }) => {
						const { teamDailyStatses = [], teamBonusStatses = [],  today } = response;

						const platform = state$.value.platform.get('data').toObject();
						const platformMaxBonus = platform.bonus ? platform.bonus.max : 0;
						const todayDailyStatses = teamDailyStatses.filter(state => state.date === today)[0] || {};
						const { numOfRegistries = 0, numOfBettingUsers = 0 } = todayDailyStatses;

						const updateTeamBonusStatses = teamBonusStatses.map(teamBonusStats => {
							const { deltaBonus, numOfUsers } = teamBonusStats;

							return {
								bonus: calculateBonus(deltaBonus, platformMaxBonus),
								numOfUsers: numOfUsers
							};
						});
						const teamStats =  {
							...response,
							numOfRegistries,
							numOfBettingUsers,
							teamBonusStatses: updateTeamBonusStatses,
						};

						return fetchTeamStatsSuccessAction(teamStats);
					}),
					catchError(error => catchErrorMessageForEpics(error, fetchTeamStatsFailedAction)),
				);
		}),
	);
}

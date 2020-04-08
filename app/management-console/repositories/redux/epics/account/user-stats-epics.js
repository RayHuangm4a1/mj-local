import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	userStatsActions,
} from '../../../../controller';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const { START_FETCH_USER_STATS, } = actionTypes;
const {
	fetchUserStatsSuccessAction,
	fetchUserStatsFailedAction,
} = userStatsActions;

export function fetchUserStatsEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_USER_STATS),
		switchMap(({ userId }) =>
			rxjsApiFetcher
				.get(`users/id=${userId}/stats`)
				.pipe(
					map(payload => fetchUserStatsSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, fetchUserStatsFailedAction))
				)
		)
	);
}

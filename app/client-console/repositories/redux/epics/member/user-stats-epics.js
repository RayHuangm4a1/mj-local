import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	userStatsActions,
} from '../../../../controller';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import { objectFilter, objectFilterOptionEnums } from '../../../../../lib/object-utils';

const {
	START_FETCH_USER_STATS,
} = actionTypes;
const {
	fetchUserStatsSuccessAction,
	fetchUserStatsFailedAction,
} = userStatsActions;
const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

export function fetchUserStatsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_USER_STATS),
		switchMap((action) => rxjsApiFetcher
			.get(`/users/id=me/daily-stats`, { queries: objectFilter(action.queries, options), })
			.pipe(
				map((payload) => {
					return fetchUserStatsSuccessAction(payload.response);
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchUserStatsFailedAction)),
			)
		),
	);
}

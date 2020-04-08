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
	teamReportsActions,
} from '../../../../controller';
import { objectFilter, objectFilterOptionEnums } from '../../../../../lib/object-utils';
const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_EMPTY_STRING];

const { START_FETCH_TEAM_REPORTS } = actionTypes;
const {
	fetchTeamReportsSuccessAction,
	fetchTeamReportsFailedAction,
} = teamReportsActions;

export function fetchTeamReportsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_TEAM_REPORTS),
		switchMap(action => {
			const { userIdOrUsername, query } = action;

			return rxjsApiFetcher
				.get(`/teams/leaderKey=${userIdOrUsername}/daily-stats`, { queries: objectFilter(query, options) })
				.pipe(
					map((payload) => {
						return fetchTeamReportsSuccessAction(payload.response.data);
					}),
					catchError(error => catchErrorMessageForEpics(error, fetchTeamReportsFailedAction)),
				);
		}),
	);
}

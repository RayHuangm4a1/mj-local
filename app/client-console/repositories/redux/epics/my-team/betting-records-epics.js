import { ofType, } from 'redux-observable';
import {
	map,
	switchMap,
	catchError,
} from 'rxjs/operators';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import { objectFilter, objectFilterOptionEnums, } from '../../../../../lib/object-utils';
import {
	actionTypes,
	teamBettingRecordActions,
} from '../../../../controller';

const { START_FETCH_TEAM_BETTING_RECORDS, } = actionTypes;
const {
	fetchTeamBettingRecordsFailedAction,
	fetchTeamBettingRecordsSuccessAction,
} = teamBettingRecordActions;

const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

export function fetchTeamBettingRecordsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_TEAM_BETTING_RECORDS),
		switchMap(action => rxjsApiFetcher
			.get(`teams/leaderId=me/bettings`, { queries: objectFilter(action.queries, options), })
			.pipe(
				map(payload => {
					const { queries = {} } = action;
					const { page } = queries;
					const response = {
						...payload.response,
						page,
					};

					return fetchTeamBettingRecordsSuccessAction(response);
				}),
				catchError(error => catchErrorMessageForEpics(error, fetchTeamBettingRecordsFailedAction)),
			),
		),
	);
}

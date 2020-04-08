import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	cashSystemHierarchicalLogPageActions,
} from '../../../../controller';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import { objectFilter, objectFilterOptionEnums } from '../../../../../lib/object-utils';

const { START_FETCH_USER_LEVEL_LOGS, } = actionTypes;
const {
	fetchUserLevelLogsSuccessAction,
	fetchUserLevelLogsFailedAction,
} = cashSystemHierarchicalLogPageActions;
const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

export function fetchCashSystemHierarchicalLogsEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_USER_LEVEL_LOGS),
		switchMap(action => (rxjsApiFetcher
			.get('user-level-logs',
				{
					queries: objectFilter(action.queries, options)
				}
			).pipe(
				map(payload => payload.response),
				map(userLevelLogs => fetchUserLevelLogsSuccessAction(userLevelLogs)),
				catchError(error => catchErrorMessageForEpics(error, fetchUserLevelLogsFailedAction))
			)
		)),
	);
}

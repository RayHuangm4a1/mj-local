import { ofType, } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
	debounceTime,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	rxjsApiFetcher,
} from '../../../../lib/general-utils';
import {
	actionTypes,
	usersActions,
} from '../../../../controller';
import {
	objectFilter,
	objectFilterOptionEnums,
} from '../../../../../lib/object-utils';

const {
	START_FETCH_USERS,
} = actionTypes;
const {
	fetchUsersSuccessAction,
	fetchUsersFailedAction,
} = usersActions;

const DEBOUNCE_TIME = 300;

const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;

const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

export function fetchUsersEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_USERS),
		debounceTime(DEBOUNCE_TIME),
		switchMap((action = {}) => {
			return rxjsApiFetcher.get(
				'users',
				{ queries: objectFilter(action.queries, options), }
			).pipe(
				map(payload => payload.response),
				map((response = {}) => fetchUsersSuccessAction({
					data: response.data,
					numOfPages: response.numOfPages,
					numOfItems: response.numOfItems,
				})),
				catchError(error => catchErrorMessageForEpics(error, fetchUsersFailedAction))
			);
		}),
	);
}

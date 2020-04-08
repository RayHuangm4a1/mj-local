import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	fixedWageActions,
} from '../../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	getUserData,
} from '../../../../lib/user-utils';
import { objectFilter, objectFilterOptionEnums } from '../../../../../lib/object-utils';
import { getQueryString } from 'ljit-lib/qs-utils';

const {
	START_FETCH_FIXED_WAGES,
	START_UPDATE_USER_FIXED_WAGE,
} = actionTypes;
const {
	fetchFixedWagesSuccessAction,
	fetchFixedWagesFailedAction,
	updateUserFixedWageSuccessAction,
	updateUserFixedWageFailedAction,
} = fixedWageActions;
const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

export function fetchFixedWageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_FIXED_WAGES),
		switchMap(action => {
			const param = getQueryString(objectFilter(action.query, options));

			return rxjsApiFetcher
				.get(`/teams/leaderId=me/children?fixedWage=1&${param}`)
				.pipe(
					map(payload => {
						const platformData = state$.value.platform.get('data').toObject();
						const children = payload.response.data.children.map(user => {
							const bonus = getUserData(platformData, user).bonus;
	
							user.bonus = bonus;
							return user;
						});
						const { numOfItems, numOfPages, data } = payload.response;
						const { query = {} } = action;
						const { page } = query;

						return fetchFixedWagesSuccessAction({ children, numOfItems, numOfPages, page });
					}),
					catchError(error => catchErrorMessageForEpics(error, fetchFixedWagesFailedAction)),
				);
		})
	);
}

export function updateUserFixedWageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_FIXED_WAGE),
		switchMap(action => {
			const { childrenId, fixedWage } = action;

			return rxjsApiFetcher
				.put(`/teams/leaderId=me/children/id=${childrenId}/fixed-wage`, { fixedWage })
				.pipe(
					map(() => updateUserFixedWageSuccessAction(childrenId, fixedWage)),
					catchError(error => catchErrorMessageForEpics(error, updateUserFixedWageFailedAction)),
				);
		})
	);
}

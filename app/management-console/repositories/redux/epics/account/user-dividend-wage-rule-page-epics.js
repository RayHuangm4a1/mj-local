import { ofType } from 'redux-observable';
import { of, zip, race, concat } from 'rxjs';
import {
	switchMap,
	mergeMap,
	take,
	map
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	userDividendWageRulePageActions,
	platformActions,
	userProfileActions,
	userDividendSettingsActions,
} from '../../../../controller';

const {
	START_INIT_USER_DIVIDEND_WAGE_RULE_PAGE,
	FETCH_PLATFORM_SUCCESS,
	FETCH_PLATFORM_FAILED,
	FETCH_USER_PROFILE_SUCCESS,
	FETCH_USER_PROFILE_FAILED,
	FETCH_USER_DIVIDEND_SETTINGS_SUCCESS,
	FETCH_USER_DIVIDEND_SETTINGS_FAILED,
} = actionTypes;
const {
	initUserDividendWageRulePageSuccessAction,
	initUserDividendWageRulePageFailedAction,
} = userDividendWageRulePageActions;
const {
	fetchPlatformAction,
} = platformActions;
const {
	fetchUserProfileAction,
} = userProfileActions;
const {
	fetchUserDividendSettingsAction,
} = userDividendSettingsActions;

export function initUserDividendWageRulePageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INIT_USER_DIVIDEND_WAGE_RULE_PAGE),
		switchMap((action) => {
			const { userId, } = action;
			
			return concat(
				of(fetchPlatformAction()),
				of(fetchUserProfileAction(userId)),
				of(fetchUserDividendSettingsAction(userId)),
				race(
					zip(
						action$.ofType(FETCH_PLATFORM_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_USER_PROFILE_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_USER_DIVIDEND_SETTINGS_SUCCESS).pipe(take(1)),
					).pipe(
						map(() => initUserDividendWageRulePageSuccessAction()),
					),
					action$.ofType(FETCH_PLATFORM_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDividendWageRulePageFailedAction))
					),
					action$.ofType(FETCH_USER_PROFILE_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDividendWageRulePageFailedAction))
					),
					action$.ofType(FETCH_USER_DIVIDEND_SETTINGS_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDividendWageRulePageFailedAction))
					),
				)
			);
		})
	);
}

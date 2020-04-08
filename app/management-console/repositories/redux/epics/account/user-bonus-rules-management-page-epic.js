import { ofType } from 'redux-observable';
import {
	of,
	zip,
	race,
	concat
} from 'rxjs';
import {
	mergeMap,
	take,
} from 'rxjs/operators';
import {
	actionTypes,
	userBonusRulesManagementPageActions,
	platformActions
} from '../../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';

const {
	START_INIT_USER_BONUS_RULES_MANAGEMENT_PAGE,
	FETCH_PLATFORM_SUCCESS,
	FETCH_PLATFORM_FAILED
} = actionTypes;
const {
	initUserBonusRulesManagementPageSuccessAction,
	initUserBonusRulesManagementPageFailedAction,
} = userBonusRulesManagementPageActions;
const {
	fetchPlatformAction,
} = platformActions;

export function initUserBonusRulesManagementPageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INIT_USER_BONUS_RULES_MANAGEMENT_PAGE),
		mergeMap(() => (
			concat(
				of(fetchPlatformAction()),
				race(
					zip(
						// TODO add init page action (fetch...)
						action$.ofType(FETCH_PLATFORM_SUCCESS).pipe(take(1)),
					).pipe(
						mergeMap((payloads) => {
							return [initUserBonusRulesManagementPageSuccessAction(payloads)];
						}),
					),
					action$.ofType(FETCH_PLATFORM_FAILED).pipe(
						take(1),
						mergeMap(error => {
							return catchErrorMessageForEpics(error, initUserBonusRulesManagementPageFailedAction);
						})
					),
				)
			)
		)),
	);
}

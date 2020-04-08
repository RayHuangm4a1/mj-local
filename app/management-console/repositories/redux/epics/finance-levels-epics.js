import { ofType, } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	actionTypes,
	financeLevelsActions,
} from '../../../controller';
import { rxjsApiFetcher, } from '../../../lib/general-utils';
import { objectFilter, objectFilterOptionEnums } from '../../../../lib/object-utils';
const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

const {
	START_FETCH_FINANCE_LEVELS,
	START_UPDATE_FINANCE_NORMAL_LEVELS,
	START_UPDATE_FINANCE_SPECIAL_LEVELS,
	START_FETCH_FINANCE_LEVEL_USERS,
} = actionTypes;
const {
	fetchFinanceLevelsSuccessAction,
	fetchFinanceLevelsFailedAction,
	updateFinanceNormalLevelsSuccessAction,
	updateFinanceNormalLevelsFailedAction,
	updateFinanceSpecialLevelsSuccessAction,
	updateFinanceSpecialLevelsFailedAction,
	fetchFinanceLevelUsersSuccessAction,
	fetchFinanceLevelUsersFailedAction,
} = financeLevelsActions;

export function fetchFinanceLevelsEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_FINANCE_LEVELS),
		switchMap(() => (
			rxjsApiFetcher
				.get('levels')
				.pipe(
					map(payload => fetchFinanceLevelsSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, fetchFinanceLevelsFailedAction)),
				)
		))
	);
}

export function updateFinanceNormalLevelsEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_FINANCE_NORMAL_LEVELS),
		switchMap(({
			levelId,
			isBettingAmountGreaterThanDepositAmount,
			description,
			status,
			withdrawalAmount,
			numOfWithdraws,
			bettingAmount,
			depositAmount,
			numOfDeposits,
			numOfRegisteredDays,
			registeredBefore,
			registeredAfter,
			name,
		}) => (
			rxjsApiFetcher
				.patch(
					`levels/id=${levelId}`,
					{
						isBettingAmountGreaterThanDepositAmount,
						description,
						status,
						withdrawalAmount,
						numOfWithdraws,
						bettingAmount,
						depositAmount,
						numOfDeposits,
						numOfRegisteredDays,
						registeredBefore,
						registeredAfter,
						name,
					},
				)
				.pipe(
					map(() => updateFinanceNormalLevelsSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, updateFinanceNormalLevelsFailedAction)),
				)
		))
	);
}

export function updateFinanceSpecialLevelsEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_FINANCE_SPECIAL_LEVELS),
		switchMap(({ levelId, status, name, } = {}) => (
			rxjsApiFetcher
				.patch(`levels/id=${levelId}`, { status, name, })
				.pipe(
					map(() => updateFinanceSpecialLevelsSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, updateFinanceSpecialLevelsFailedAction)),
				)
		))
	);
}

export function fetchFinanceLevelUsersEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_FINANCE_LEVEL_USERS),
		switchMap(action => (rxjsApiFetcher
			.get(`levels/id=${action.levelId}/users`,
				{
					queries: objectFilter(action.queries, options)
				}
			).pipe(
				map(payload => fetchFinanceLevelUsersSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchFinanceLevelUsersFailedAction))
			)
		)),
	);
}

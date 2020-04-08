import { ofType } from 'redux-observable';
import {
	of,
	race,
	concat,
} from 'rxjs';
import {
	map,
	switchMap,
	mergeMap,
	take,
	debounceTime,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	cashSystemHierarchicalManagementPageActions,
	financeLevelsActions,
	userFinanceLevelActions,
} from '../../../../controller';

const DEBOUNCE_TIME = 300;

const {
	START_INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE,
	START_REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS,
	START_FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL,
	FETCH_FINANCE_LEVELS_SUCCESS,
	FETCH_FINANCE_LEVELS_FAILED,
	FETCH_USER_FINANCE_LEVEL_SUCCESS,
	FETCH_USER_FINANCE_LEVEL_FAILED,
} = actionTypes;
const {
	initCashSystemHierarchicalManagementPageSuccessAction,
	initCashSystemHierarchicalManagementPageFailedAction,
	refreshCashSystemHierarchicalManagementNormalLevelsSuccessAction,
	refreshCashSystemHierarchicalManagementNormalLevelsFailedAction,
	fetchCashSystemHierarchicalManagementUserLevelSuccessAction,
	fetchCashSystemHierarchicalManagementUserLevelFailedAction,
} = cashSystemHierarchicalManagementPageActions;
const {
	fetchFinanceLevelsAction,
} = financeLevelsActions;
const {
	fetchUserFinanceLevelAction,
} = userFinanceLevelActions;

export function initCashSystemHierarchicalManagementPageEpic(action$) {
	return action$.pipe(
		ofType(START_INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE),
		switchMap(() => (
			concat(
				of(fetchFinanceLevelsAction()),
				race(
					action$.ofType(FETCH_FINANCE_LEVELS_SUCCESS).pipe(
						take(1),
						map(() => initCashSystemHierarchicalManagementPageSuccessAction()),
					),
					action$.ofType(FETCH_FINANCE_LEVELS_FAILED).pipe(
						take(1),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, initCashSystemHierarchicalManagementPageFailedAction))
					),
				)
			)
		)),
	);
}

export function refreshCashSystemHierarchicalManagementNormalLevelsEpic(action$) {
	return action$.pipe(
		ofType(START_REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS),
		debounceTime(DEBOUNCE_TIME),
		switchMap(() => (
			concat(
				of(fetchFinanceLevelsAction()),
				race(
					action$.ofType(FETCH_FINANCE_LEVELS_SUCCESS).pipe(
						take(1),
						map(() => refreshCashSystemHierarchicalManagementNormalLevelsSuccessAction()),
					),
					action$.ofType(FETCH_FINANCE_LEVELS_FAILED).pipe(
						take(1),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, refreshCashSystemHierarchicalManagementNormalLevelsFailedAction))
					),
				)
			)
		)),
	);
}

export function fetchCashSystemHierarchicalManagementUserLevelEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL),
		debounceTime(DEBOUNCE_TIME),
		switchMap(({ username, }) => (
			concat(
				of(fetchUserFinanceLevelAction(username)),
				race(
					action$.ofType(FETCH_USER_FINANCE_LEVEL_SUCCESS).pipe(
						take(1),
						map(() => fetchCashSystemHierarchicalManagementUserLevelSuccessAction()),
					),
					action$.ofType(FETCH_USER_FINANCE_LEVEL_FAILED).pipe(
						take(1),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, fetchCashSystemHierarchicalManagementUserLevelFailedAction))
					),
				)
			)
		)),
	);
}

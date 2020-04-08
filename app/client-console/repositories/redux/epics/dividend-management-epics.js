import { ofType } from 'redux-observable';
import {
	mergeMap,
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	actionTypes,
	dividendManagementActions,
	walletsActions,
} from '../../../controller';
import { objectFilter, objectFilterOptionEnums, } from '../../../../lib/object-utils';
import { rxjsApiFetcher } from '../../../lib/general-utils';
const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

const {
	START_FETCH_DIVIDENDS,
	START_FETCH_DIVIDEND_DURATIONS,
	START_FETCH_DIVIDEND_SETTINGS_SELF,
	START_FETCH_DIVIDEND_SETTINGS_TEMPLATE,
	START_UPDATE_DIVIDEND_SETTINGS_TEMPLATE,
	START_UPDATE_CHILDREN_DIVIDEND_SETTINGS,
	START_GRANT_DIVIDENDS,
} = actionTypes;
const {
	fetchDividendsSuccessAction,
	fetchDividendsFailedAction,
	fetchDividendDurationsSuccessAction,
	fetchDividendDurationsFailedAction,
	fetchUserDividendSettingsSuccessAction,
	fetchUserDividendSettingsFailedAction,
	fetchDividendSettingsTemplateSuccessAction,
	fetchDividendSettingsTemplateFailedAction,
	updateDividendSettingsTemplateSuccessAction,
	updateDividendSettingsTemplateFailedAction,
	updateChildrenDividendSettingsSuccessAction,
	updateChildrenDividendSettingsFailedAction,
	grantDividendSuccessAction,
	grantDividendFailedAction,
} = dividendManagementActions;
const {
	updateWallet,
} = walletsActions;

export function fetchDividendsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_DIVIDENDS),
		switchMap((action) => {
			return rxjsApiFetcher.get('/teams/leaderId=me/children?dividends=1', {
				queries: objectFilter(action.queries, options),
			})
				.pipe(
					map(payload => fetchDividendsSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, fetchDividendsFailedAction)),
				);
		})
	);
}

export function fetchDividendDurationsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_DIVIDEND_DURATIONS),
		switchMap(() => {
			return rxjsApiFetcher.get('dividend-durations')
				.pipe(
					map(payload => {
						return fetchDividendDurationsSuccessAction(payload.response);
					}),
					catchError(error => {
						return catchErrorMessageForEpics(error, fetchDividendDurationsFailedAction);
					}),
				);
		})
	);
}
export function fetchUserDividendSettingsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_DIVIDEND_SETTINGS_SELF),
		switchMap((action) =>
			rxjsApiFetcher
				.get('users/id=me/dividend-settings/type=self')
				.pipe(
					map((payload) => {
						return fetchUserDividendSettingsSuccessAction(payload.response);
					}),
					catchError(error => catchErrorMessageForEpics(error, fetchUserDividendSettingsFailedAction)),
				)
		),
	);
}
export function fetchDividendSettingsTemplateEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_DIVIDEND_SETTINGS_TEMPLATE),
		switchMap((action) =>
			rxjsApiFetcher
				.get('users/id=me/dividend-settings/type=template')
				.pipe(
					map((payload) => {
						return fetchDividendSettingsTemplateSuccessAction(payload.response);
					}),
					catchError(error => catchErrorMessageForEpics(error, fetchDividendSettingsTemplateFailedAction)),
				)
		),
	);
}
export function updateDividendSettingsTemplateEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_DIVIDEND_SETTINGS_TEMPLATE),
		switchMap((action) => {
			return rxjsApiFetcher
				.put(`users/id=me/dividend-settings/type=template`, action.template)
				.pipe(
					map((payload) => {
						return updateDividendSettingsTemplateSuccessAction(payload.response);
					}),
					catchError(error => catchErrorMessageForEpics(error, updateDividendSettingsTemplateFailedAction)),
				);
		}),
	);
}

export function updateChildrenDividendSettingEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_CHILDREN_DIVIDEND_SETTINGS),
		switchMap((action) => {
			return rxjsApiFetcher
				.put(`teams/leaderId=me/children/id=${action.childrenId}/dividends/type=self/settings`, action.dividendSettings)
				.pipe(
					map(() => updateChildrenDividendSettingsSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, updateChildrenDividendSettingsFailedAction)),
				);
		}),
	);
}

export function grantDividendEpic(action$, state$) {
	return action$.pipe(
		ofType(START_GRANT_DIVIDENDS),
		switchMap((action) => {
			return rxjsApiFetcher
				.post(`teams/leaderId=me/children/id=${action.childrenId}/dividends`, {
					walletCode: action.walletCode,
					amount: action.amount,
					password: action.password,
				})
				.pipe(
					map(payload => payload.response),
					mergeMap((response) => {
						return [
							grantDividendSuccessAction(response.result),
							updateWallet(response.wallet),
						];
					}),
					catchError(error => catchErrorMessageForEpics(error, grantDividendFailedAction)),
				);
		}),
	);
}

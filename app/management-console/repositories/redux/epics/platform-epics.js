import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	START_FETCH_PLATFORM,
	START_UPDATE_BONUS_RULES,
	START_UPDATE_PLATFORM_DIVIDEND_SETTINGS,
	START_UPDATE_PLATFORM_FIXED_WAGE,
} from '../../../controller/actions/action-types';
import {
	fetchPlatformSuccessAction,
	fetchPlatformFailedAction,
	updateBonusRulesSuccessAction,
	updatePlatformDividendSettingsSuccessAction,
	updatePlatformDividendSettingsFailedAction,
	updatePlatformFixedWageSuccessAction,
	updatePlatformFixedWageFailedAction,
} from '../../../controller/actions/platform-actions';
import { rxjsApiFetcher } from '../../../lib/general-utils';
import { catchErrorMessageForEpics } from '../../../../lib/epic-utils';

export function fetchPlatformEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_PLATFORM),
		switchMap(() => rxjsApiFetcher
			.get('/platform')
			.pipe(
				map(payload => fetchPlatformSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchPlatformFailedAction)),
			)
		)
	);
}

// TODO 改成 API
export function updateBonusRulesEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_BONUS_RULES),
		map((action) => {
			return Object.assign(
				{},
				state$.value.bonusRules.get("bonusRules").toJS(),
				{ [action.ruleId]: action.rule },
			);
		}),
		map(payload => updateBonusRulesSuccessAction(payload)),

		// switchMap(action =>
		// 	of().pipe(
		// 		map(payload => updateBonusRulesSuccessAction(payload)),
		// 		catchError(error => catchErrorMessageForEpics(error, fetchPlatformFailedAction)),
		// 	)
		// )
	);
}

export function updatePlatformDividendSettingsEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_PLATFORM_DIVIDEND_SETTINGS),
		switchMap(action => rxjsApiFetcher
			.put(`/platform/dividend-settings`, action.dividendSetting)
			.pipe(
				map(payload => payload.response),
				map((response) => updatePlatformDividendSettingsSuccessAction(response)),
				catchError(error => catchErrorMessageForEpics(error, updatePlatformDividendSettingsFailedAction)),
			)
		)
	);
}

export function updateZhaoShangFixedWageEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_PLATFORM_FIXED_WAGE),
		switchMap(({ fixedWage }) => rxjsApiFetcher
			.put('platform/fixed-wage', {
				fixedWage,
			})
			.pipe(
				map(() => updatePlatformFixedWageSuccessAction(fixedWage)),
				catchError(error => catchErrorMessageForEpics(error, updatePlatformFixedWageFailedAction)),
			)
		)
	);
}

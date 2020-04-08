import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	userDividendSettingsActions,
} from '../../../../controller';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	START_FETCH_USER_DIVIDEND_SETTINGS,
	START_UPDTATE_USER_DIVIDEND_SETTINGS,
} = actionTypes;
const {
	fetchUserDividendSettingsSuccessAction,
	fetchUserDividendSettingsFailedAction,
	updateUserDividendSettingsSuccessAction,
	updateUserDividendSettingsFailedAction,
} = userDividendSettingsActions;

export function fetchUserDividendSettingsEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_USER_DIVIDEND_SETTINGS),
		switchMap(({ userId }) =>
			rxjsApiFetcher
				.get(`users/id=${userId}/dividend-settings`)
				.pipe(
					map(payload => fetchUserDividendSettingsSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, fetchUserDividendSettingsFailedAction))
				)
		)
	);
}

export function updateUserDividendSettingsEpic(action$) {
	return action$.pipe(
		ofType(START_UPDTATE_USER_DIVIDEND_SETTINGS),
		switchMap(({ userId, dividendSettings, }) => {
			const body = dividendSettings.map(setting => {
				const { ratio, amount, } = setting;

				return { ratio, amount, };
			});

			return rxjsApiFetcher
				.put(`users/id=${userId}/dividend-settings`, body)
				.pipe(
					map(payload => updateUserDividendSettingsSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, updateUserDividendSettingsFailedAction))
				);
		})
	);
}

import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	START_CREATE_ZHAO_SHANG_ACCOUNT,
	START_FETCH_ZHAO_SHANG_ACCOUNTS,
} from '../../../../controller/actions/action-types';
import {
	fetchZhaoShangAccountsSuccessAction,
	fetchZhaoShangAccountsFailedAction,
	createZhaoShangAccountSuccessAction,
	createZhaoShangAccountFailedAction,
} from '../../../../controller/actions/zhao-shang-account-actions';
import {
	catchErrorMessageForEpics,
} from "../../../../../lib/epic-utils";
import { objectFilter, objectFilterOptionEnums, } from '../../../../../lib/object-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import { UserTypeEnum, } from '../../../../lib/enums';

const {
	SKIP_EMPTY_STRING,
	SKIP_UNDEFINED,
	SKIP_NULL,
} = objectFilterOptionEnums;
const options = [ SKIP_EMPTY_STRING, SKIP_UNDEFINED, SKIP_NULL, ];

export function fetchZhaoShangAccountsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_ZHAO_SHANG_ACCOUNTS),
		switchMap(({ limit, page, sort, order, } = {}) => rxjsApiFetcher
			.get('zhaoshangs', {
				queries: objectFilter({
					limit,
					page,
					sort,
					order,
				}, options),
			})
			.pipe(
				map((payload = {}) => fetchZhaoShangAccountsSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchZhaoShangAccountsFailedAction)),
			)
		)
	);
}

export function createZhaoShangAccountEpic(action$, state$) {
	return action$.pipe(
		ofType(START_CREATE_ZHAO_SHANG_ACCOUNT),
		switchMap(({ nickname, bonus, password, username, } = {}) => {
			const body = {
				type: UserTypeEnum.ZHAOSHANG,
				nickname,
				bonus,
				password,
				username,
			};

			return rxjsApiFetcher
				.post('users', body)
				.pipe(
					map(() => createZhaoShangAccountSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, createZhaoShangAccountFailedAction)),
				);
		})
	);
}

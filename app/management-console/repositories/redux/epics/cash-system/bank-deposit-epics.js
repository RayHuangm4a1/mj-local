import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	cashSystemBankDepositActions,
} from '../../../../controller';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import { objectFilter, objectFilterOptionEnums } from '../../../../../lib/object-utils';
const {
	START_FETCH_CASH_SYSTEM_BANK_DEPOSIT,
} = actionTypes;
const {
	fetchCashSystemBankDepositSuccessAction,
	fetchCashSystemBankDepositFailedAction,
} = cashSystemBankDepositActions;
const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

export function fetchCashSystemBankDepositEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_CASH_SYSTEM_BANK_DEPOSIT),
		switchMap(action => (rxjsApiFetcher
			.get(
				`departments/id=${action.departmentId}/deposit-classes/id=${action.depositClassId}/deposit-application-forms`,
				{
					queries: {
						...objectFilter(action.query, options)
					}
				}
			).pipe(
				map(payload => fetchCashSystemBankDepositSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchCashSystemBankDepositFailedAction))
			)
		)),
	);
}

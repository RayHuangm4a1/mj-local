import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	userBankCardsAction,
} from '../../../../controller';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	START_FETCH_USER_BANK_CARDS,
	START_CREATE_USER_BANK_CARD,
	START_DELETE_USER_BANK_CARD,
} = actionTypes;
const {
	fetchUserBankCardsSuccessAction,
	fetchUserBankCardsFailedAction,
	createUserBankCardSuccessAction,
	createUserBankCardFailedAction,
	deleteUserBankCardSuccessAction,
	deleteUserBankCardFailedAction,
} = userBankCardsAction;

export function fetchUserBankCardsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_USER_BANK_CARDS),
		switchMap((action) => rxjsApiFetcher
			.get(`/bank-cards`)
			.pipe(
				map((payload) => fetchUserBankCardsSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchUserBankCardsFailedAction)),
			)
		),
	);
}
export function createUserBankCardEpic(action$, state$) {
	return action$.pipe(
		ofType(START_CREATE_USER_BANK_CARD),
		switchMap((action) => {
			const { payer, number, } = action;
			const bodyParameter = payer ? { payer, number, } : { number, };

			return rxjsApiFetcher
				.post(`/bank-cards`, bodyParameter)
				.pipe(
					map((payload) => createUserBankCardSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, createUserBankCardFailedAction)),
				);
		}),
	);
}
export function deleteUserBankCardEpic(action$, state$) {
	return action$.pipe(
		ofType(START_DELETE_USER_BANK_CARD),
		switchMap((action) => {
			const { bankCardId, password, } = action;

			return rxjsApiFetcher
				.delete(`/bank-cards/id=${bankCardId}`, { password, })
				.pipe(
					map(() => deleteUserBankCardSuccessAction(bankCardId)),
					catchError(error => catchErrorMessageForEpics(error, deleteUserBankCardFailedAction)),
				);
		}),
	);
}

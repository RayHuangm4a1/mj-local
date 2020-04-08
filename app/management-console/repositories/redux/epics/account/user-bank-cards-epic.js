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
	userBankCardsActions
} from '../../../../controller';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import { objectFilter, objectFilterOptionEnums, } from '../../../../../lib/object-utils';

const {
	START_FETCH_USER_BANK_CARDS,
	START_CREATE_USER_BANK_CARD,
	START_DELETE_USER_BANK_CARD,
	START_ENABLE_USER_BANK_CARD_WITHDRAWABLE,
	START_UPDATE_USER_BANK_CARD_NUMBER,
	START_ENABLE_USER_BANK_CARD,
	START_DISABLE_USER_BANK_CARD,
} = actionTypes;
const {
	fetchUserBankCardsSuccessAction,
	fetchUserBankCardsFailedAction,
	createUserBankCardSuccessAction,
	createUserBankCardFailedAction,
	deleteUserBankCardSuccessAction,
	deleteUserBankCardFailedAction,
	enableUserBankCardWithdrawableSuccessAction,
	enableUserBankCardWithdrawableFailedAction,
	updateUserBankCardNumberSuccessAction,
	updateUserBankCardNumberFailedAction,
	enableUserBankCardSuccessAction,
	enableUserBankCardFailedAction,
	disableUserBankCardSuccessAction,
	disableUserBankCardFailedAction,
} = userBankCardsActions;

const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

export function fetchUserBankCardsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_USER_BANK_CARDS),
		switchMap((action) => rxjsApiFetcher
			.get(`/users/id=${action.userId}/bank-cards`, { queries: objectFilter(action.queries, options) })
			.pipe(
				map(payload => payload.response),
				map(bankCards => fetchUserBankCardsSuccessAction(bankCards)),
				catchError(error => catchErrorMessageForEpics(error, fetchUserBankCardsFailedAction))
			)
		),
	);
}

export function createUserBankCardEpic(action$, state$) {
	return action$.pipe(
		ofType(START_CREATE_USER_BANK_CARD),
		switchMap((action) => {
			const { userId, number, } = action;

			return rxjsApiFetcher
				.post(`/users/id=${userId}/bank-cards`, {
					number,
				})
				.pipe(
					map(payload => payload.response),
					map(bankCard => createUserBankCardSuccessAction(bankCard)),
					catchError(error => catchErrorMessageForEpics(error, createUserBankCardFailedAction))
				);
		})
	);
}

export function deleteUserBankCardEpic(action$, state$) {
	return action$.pipe(
		ofType(START_DELETE_USER_BANK_CARD),
		switchMap((action) => {
			const { userId, bankCardId, } = action;

			return rxjsApiFetcher
				.delete(`/users/id=${userId}/bank-cards/id=${bankCardId}`)
				.pipe(
					map(() => deleteUserBankCardSuccessAction(bankCardId)),
					catchError(error => catchErrorMessageForEpics(error, deleteUserBankCardFailedAction))
				);
		})
	);
}

export function enableUserBankCardWithdrawableEpic(action$, state$) {
	return action$.pipe(
		ofType(START_ENABLE_USER_BANK_CARD_WITHDRAWABLE),
		switchMap(({ userId, bankCardId, } = {}) => rxjsApiFetcher
			.post(`/users/id=${userId}/bank-cards/id=${bankCardId}/withdrawable`)
			.pipe(
				map(payload => payload.response),
				map(bankCard => enableUserBankCardWithdrawableSuccessAction(bankCard)),
				catchError(error => catchErrorMessageForEpics(error, enableUserBankCardWithdrawableFailedAction)),
			)
		),
	);
}
export function updateUserBankCardNumberEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_BANK_CARD_NUMBER),
		switchMap(({ userId, bankCardId: oldBankCardId, number, }) => rxjsApiFetcher
			.put(`/users/id=${userId}/bank-cards/id=${oldBankCardId}/number`, {
				number,
			})
			.pipe(
				map(payload => payload.response),
				map(bankCard => updateUserBankCardNumberSuccessAction(bankCard, oldBankCardId)),
				catchError(error => catchErrorMessageForEpics(error, updateUserBankCardNumberFailedAction))
			)
		)
	);
}

export function enableUserBankCardEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_USER_BANK_CARD),
		switchMap((action) => {
			const { userId, bankCardId, } = action;

			return rxjsApiFetcher
				.delete(`/users/id=${userId}/bank-cards/id=${bankCardId}/blocked`)
				.pipe(
					map((payload) => enableUserBankCardSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, enableUserBankCardFailedAction))
				);
		})
	);
}
export function disableUserBankCardEpic(action$) {
	return action$.pipe(
		ofType(START_DISABLE_USER_BANK_CARD),
		switchMap((action) => {
			const { userId, bankCardId, } = action;

			return rxjsApiFetcher
				.post(`/users/id=${userId}/bank-cards/id=${bankCardId}/blocked`)
				.pipe(
					map((payload) =>  disableUserBankCardSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, disableUserBankCardFailedAction))
				);
		})
	);
}

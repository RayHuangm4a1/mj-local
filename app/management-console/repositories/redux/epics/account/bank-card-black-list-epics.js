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
	bankCardBlackListActions,
} from '../../../../controller';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import { objectFilter, objectFilterOptionEnums, } from '../../../../../lib/object-utils';

const {
	START_FETCH_BANK_CARD_BLACK_LIST,
	START_ADD_BANK_CARDS_TO_BLACK_LIST,
	START_REMOVE_BANK_CARD_FROM_BLACK_LIST,
} = actionTypes;
const {
	fetchBankCardBlackListSuccessAction,
	fetchBankCardBlackListFailedAction,
	addBankCardsToBlackListSuccessAction,
	addBankCardsToBlackListFailedAction,
	removeBankCardFromBlackListSuccessAction,
	removeBankCardFromBlackListFailedAction,
} = bankCardBlackListActions;

const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];
const BLOCKED_BANK_CARD_STATUS = 3;

export function fetchBankCardBlackListEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_BANK_CARD_BLACK_LIST),
		switchMap((action) => rxjsApiFetcher
			.get(`/bank-cards`, {
				queries: objectFilter(
					{
						...action.queries,
						status: BLOCKED_BANK_CARD_STATUS,
					},
					options
				)
			})
			.pipe(
				map(payload => payload.response),
				map(bankCardBlackList => fetchBankCardBlackListSuccessAction(bankCardBlackList)),
				catchError(error => catchErrorMessageForEpics(error, fetchBankCardBlackListFailedAction))
			)
		),
	);
}

export function addBankCardToBlackListEpic(action$,) {
	return action$.pipe(
		ofType(START_ADD_BANK_CARDS_TO_BLACK_LIST),
		switchMap(({ bankCards, }) => rxjsApiFetcher
			.post(`/bank-cards?status=${BLOCKED_BANK_CARD_STATUS}`, bankCards.map(bankCard => objectFilter(bankCard, options)))
			.pipe(
				map(() => addBankCardsToBlackListSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, addBankCardsToBlackListFailedAction))
			)
		)
	);
}

export function removeBankCardFromBlackListEpic(action$,) {
	return action$.pipe(
		ofType(START_REMOVE_BANK_CARD_FROM_BLACK_LIST),
		switchMap(({ bankCardId, }) => rxjsApiFetcher
			.delete(`/bank-cards/id=${bankCardId}/blocked`)
			.pipe(
				map(() => removeBankCardFromBlackListSuccessAction(bankCardId)),
				catchError(error => catchErrorMessageForEpics(error, removeBankCardFromBlackListFailedAction))
			)
		)
	);
}

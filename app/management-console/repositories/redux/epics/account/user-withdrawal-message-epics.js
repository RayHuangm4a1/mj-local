import { ofType, } from 'redux-observable';
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
	userWithdrawalActions
} from '../../../../controller';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	START_FETCH_USER_WITHDRAWAL_MESSAGE,
	START_UPDATE_USER_WITHDRAWAL_MESSAGE,
	START_DELETE_USER_WITHDRAWAL_MESSAGE,
} = actionTypes;

const {
	fetchUserWithdrawalMessageSuccessAction,
	fetchUserWithdrawalMessageFailedAction,
	updateUserWithdrawalMessageSuccessAction,
	updateUserWithdrawalMessageFailedAction,
	deleteUserWithdrawalMessageSuccessAction,
	deleteUserWithdrawalMessageFailedAction,
} = userWithdrawalActions;

const noWithdrawalMessage = {
	message: '',
};

export function fetchUserWithdrawalMessageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_USER_WITHDRAWAL_MESSAGE),
		switchMap((action) => (rxjsApiFetcher
			.get(`users/id=${action.userId}/withdrawal-message`)
			.pipe(
				map(payload => payload.response),
				map(payload => fetchUserWithdrawalMessageSuccessAction(payload)),
				catchError(error => {
					if (error.status === 404) {
						return [fetchUserWithdrawalMessageSuccessAction(noWithdrawalMessage),];
					} else {
						return catchErrorMessageForEpics(error, fetchUserWithdrawalMessageFailedAction);
					}
				}),
			)
		))
	);
}

export function updateUserWithdrawalMessageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_WITHDRAWAL_MESSAGE),
		switchMap((action) => (rxjsApiFetcher
			.put(`users/id=${action.userId}/withdrawal-message`, {
				message: encodeMessage(action.message)
			})
			.pipe(
				map(() => updateUserWithdrawalMessageSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, updateUserWithdrawalMessageFailedAction)),
			)
		))
	);
}

export function deleteUserWithdrawalMessageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_DELETE_USER_WITHDRAWAL_MESSAGE),
		switchMap((action) => (rxjsApiFetcher
			.delete(`users/id=${action.userId}/withdrawal-message`)
			.pipe(
				map(() => deleteUserWithdrawalMessageSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, deleteUserWithdrawalMessageFailedAction)),
			)
		))
	);
}

function encodeMessage(message) {
	return message.replace(/[<>]/g, (char) => encodeURI(char));
}

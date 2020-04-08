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
	userProfileActions,
} from '../../../../controller';
import { rxjsApiFetcher } from '../../../../lib/general-utils';
import { getUserData, } from '../../../../lib/user-utils';

const {
	START_FETCH_USER_PROFILE,
	START_ENABLE_USER,
	START_DISABLE_USER,
	START_UPDATE_USER_NICKNAME,
	START_UPDATE_USER_PAYER,
	START_UPDATE_USER_ZHUANDIAN,
	START_UPDATE_USER_TYPE,
	START_UPDATE_USER_GREETING,
	START_ENABLE_USER_FUNDS,
	START_DISABLE_USER_FUNDS,
	START_ENABLE_USER_BETTING,
	START_DISABLE_USER_BETTING,
	START_ENABLE_USER_DIVIDEND,
	START_DISABLE_USER_DIVIDEND,
	START_ENABLE_USER_TRANSFER,
	START_DISABLE_USER_TRANSFER,
	START_ENABLE_USER_WITHDRAWABLE,
	START_DISABLE_USER_WITHDRAWABLE,
	START_ENABLE_USER_DEPOSIT,
	START_DISABLE_USER_DEPOSIT,
	START_UPDATE_USER_BONUS,
	START_UPDATE_USER_FIXED_WAGE,
} = actionTypes;
const {
	fetchUserProfileSuccessAction,
	fetchUserProfileFailedAction,
	enableUserSuccessAction,
	enableUserFailedAction,
	disableUserSuccessAction,
	disableUserFailedAction,
	updateUserNicknameSuccessAction,
	updateUserNicknameFailedAction,
	updateUserPayerSuccessAction,
	updateUserPayerFailedAction,
	updateUserZhuandianSuccessAction,
	updateUserZhuandianFailedAction,
	updateUserTypeSuccessAction,
	updateUserTypeFailedAction,
	updateUserGreetingSuccessAction,
	updateUserGreetingFailedAction,
	enableUserFundsSuccessAction,
	enableUserFundsFailedAction,
	disableUserFundsSuccessAction,
	disableUserFundsFailedAction,
	enableUserBettingSuccessAction,
	enableUserBettingFailedAction,
	disableUserBettingSuccessAction,
	disableUserBettingFailedAction,
	enableUserDividendSuccessAction,
	enableUserDividendFailedAction,
	disbleUserDividendSuccessAction,
	disbleUserDividendFailedAction,
	enableUserTransferSuccessAction,
	enableUserTransferFailedAction,
	disableUserTransferSuccessAction,
	disableUserTransferFailedAction,
	enableUserWithdrawableSuccessAction,
	enableUserWithdrawableFailedAction,
	disableUserWithdrawableSuccessAction,
	disableUserWithdrawableFailedAction,
	enableUserDepositSuccessAction,
	enableUserDepositFailedAction,
	disableUserDepositSuccessAction,
	disableUserDepositFailedAction,
	updateUserBonusSuccessAction,
	updateUserBonusFailedAction,
	updateUserFixedWageSuccessAction,
	updateUserFixedWageFailedAction,
} = userProfileActions;

export function fetchUserProfileEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_USER_PROFILE),
		switchMap(action => (rxjsApiFetcher
			.get(`users/id=${action.userId}`)
			.pipe(
				map(payload => {
					const platform = state$.value.platform.get('data').toObject();
					const userProfile = getUserData(platform, payload.response);

					return userProfile;
				}),
				map(response => fetchUserProfileSuccessAction(response)),
				catchError(error => catchErrorMessageForEpics(error, fetchUserProfileFailedAction))
			)
		)),
	);
}

export function enableUserEpic(action$, state$) {
	return action$.pipe(
		ofType(START_ENABLE_USER),
		switchMap(action => rxjsApiFetcher
			.delete(`users/id=${action.userId}/blocked`)
			.pipe(
				map(() => enableUserSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableUserFailedAction))
			)
		)
	);
}
export function updateUserGreetingEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_GREETING),
		switchMap(action => (
			rxjsApiFetcher.put(`/users/id=${action.userId}/greeting`, {
				greeting: action.greeting
			}).pipe(
				map(() => updateUserGreetingSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, updateUserGreetingFailedAction))
			)
		)),
	);
}
export function enableUserDividendEpic(action$, state$) {
	return action$.pipe(
		ofType(START_ENABLE_USER_DIVIDEND),
		switchMap(action => rxjsApiFetcher
			.post(`/users/id=${action.userId}/dividendable`)
			.pipe(
				map(() => enableUserDividendSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableUserDividendFailedAction))
			)
		),
	);
}

export function disbleUserDividendEpic(action$, state$) {
	return action$.pipe(
		ofType(START_DISABLE_USER_DIVIDEND),
		switchMap(action => rxjsApiFetcher
			.delete(`/users/id=${action.userId}/dividendable`)
			.pipe(
				map(() => disbleUserDividendSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, disbleUserDividendFailedAction))
			)
		),
	);
}

export function enableUserTransferEpic(action$, state$) {
	return action$.pipe(
		ofType(START_ENABLE_USER_TRANSFER),
		switchMap(action => rxjsApiFetcher
			.post(`/users/id=${action.userId}/transferable`)
			.pipe(
				map(() => enableUserTransferSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableUserTransferFailedAction))
			)
		),
	);
}

export function disableUserTransferEpic(action$, state$) {
	return action$.pipe(
		ofType(START_DISABLE_USER_TRANSFER),
		switchMap(action => rxjsApiFetcher
			.delete(`/users/id=${action.userId}/transferable`)
			.pipe(
				map(() => disableUserTransferSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, disableUserTransferFailedAction))
			)
		),
	);
}

export function enableUserBettingEpic(action$, state$) {
	return action$.pipe(
		ofType(START_ENABLE_USER_BETTING),
		switchMap(({ userId, }) => (rxjsApiFetcher.post(`users/id=${userId}/betable`)
			.pipe(
				map(payload => payload.response),
				map(() => enableUserBettingSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableUserBettingFailedAction)),
			)
		)),
	);
}

export function disableUserBettingEpic(action$, state$) {
	return action$.pipe(
		ofType(START_DISABLE_USER_BETTING),
		switchMap(({ userId, }) => (rxjsApiFetcher.delete(`users/id=${userId}/betable`)
			.pipe(
				map(payload => payload.response),
				map(() => disableUserBettingSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, disableUserBettingFailedAction)),
			)
		)),
	);
}

export function updateUserNicknameEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_NICKNAME),
		switchMap(action => (
			rxjsApiFetcher.put(`/users/id=${action.userId}/nickname`, {
				nickname: action.nickname
			}).pipe(
				map(() => updateUserNicknameSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, updateUserNicknameFailedAction))
			)
		)),
	);
}

export function updateUserPayerEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_PAYER),
		switchMap(action => (
			rxjsApiFetcher.put(`/users/id=${action.userId}/payer`, {
				payer: action.payer
			}).pipe(
				map(() => updateUserPayerSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, updateUserPayerFailedAction))
			)
		)),
	);
}

export function updateUserZhuandianEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_ZHUANDIAN),
		switchMap(action => (
			rxjsApiFetcher.put(`/users/id=${action.userId}/zhuandian`, {
				isEnableIncentiveZhuandian: action.isEnableIncentiveZhuandian,
				isEnableDepositZhuandian: action.isEnableDepositZhuandian,
			}).pipe(
				map(() => updateUserZhuandianSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, updateUserZhuandianFailedAction))
			)
		)),
	);
}

export function updateUserTypeEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_TYPE),
		switchMap(action => (
			rxjsApiFetcher.put(`/users/id=${action.userId}/type`, {
				type: action.userType
			}).pipe(
				map(() => updateUserTypeSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, updateUserTypeFailedAction))
			)
		)),
	);
}
export function enableUserFundsEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_USER_FUNDS),
		switchMap(action => rxjsApiFetcher
			.post(`users/id=${action.userId}/fundsable`)
			.pipe(
				map(() => enableUserFundsSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableUserFundsFailedAction))
			)
		)
	);
}
export function disableUserEpic(action$, state$) {
	return action$.pipe(
		ofType(START_DISABLE_USER),
		switchMap(action => rxjsApiFetcher
			.post(`users/id=${action.userId}/blocked`)
			.pipe(
				map(() => disableUserSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, disableUserFailedAction))
			)
		)
	);
}
export function disableUserFundsEpic(action$) {
	return action$.pipe(
		ofType(START_DISABLE_USER_FUNDS),
		switchMap(action => rxjsApiFetcher
			.delete(`users/id=${action.userId}/fundsable`)
			.pipe(
				map(() => disableUserFundsSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, disableUserFundsFailedAction))
			)
		)
	);
}

export function enableUserWithdrawableEpic(action$, state$) {
	return action$.pipe(
		ofType(START_ENABLE_USER_WITHDRAWABLE),
		switchMap(action => rxjsApiFetcher
			.post(
				`/users/id=${action.userId}/withdrawable`
			).pipe(
				map(() => enableUserWithdrawableSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableUserWithdrawableFailedAction))
			)
		),
	);
}

export function disableUserWithdrawableEpic(action$, state$) {
	return action$.pipe(
		ofType(START_DISABLE_USER_WITHDRAWABLE),
		switchMap(action => rxjsApiFetcher
			.delete(
				`/users/id=${action.userId}/withdrawable`
			).pipe(
				map(() => disableUserWithdrawableSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, disableUserWithdrawableFailedAction))
			)
		),
	);
}

export function enableUserDepositEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_USER_DEPOSIT),
		switchMap(({ userId, }) => (
			rxjsApiFetcher
				.post(`users/id=${userId}/depositable`)
				.pipe(
					map(() => enableUserDepositSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, enableUserDepositFailedAction))
				)
		)),
	);
}

export function disableUserDepositEpic(action$) {
	return action$.pipe(
		ofType(START_DISABLE_USER_DEPOSIT),
		switchMap(({ userId, }) => (
			rxjsApiFetcher
				.delete(`users/id=${userId}/depositable`)
				.pipe(
					map(() => disableUserDepositSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, disableUserDepositFailedAction))
				)
		)),
	);
}

export function updateUserBonusEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_BONUS),
		switchMap(({ userId, bonus, }) => (
			rxjsApiFetcher.put(`users/id=${userId}/bonus`, { bonus, })
				.pipe(
					map(() => updateUserBonusSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, updateUserBonusFailedAction))
				)
		)),
	);
}

export function updateUserFixedWageEpic(action$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_FIXED_WAGE),
		switchMap(({ userId, fixedWage, }) => (
			rxjsApiFetcher.put(`users/id=${userId}/fixed-wage`, { fixedWage, })
				.pipe(
					map(() => updateUserFixedWageSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, updateUserFixedWageFailedAction))
				)
		)),
	);
}

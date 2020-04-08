import { ofType, } from 'redux-observable';
import {
	switchMap,
	map,
	delay,
	catchError,
} from 'rxjs/operators';
import { of } from 'rxjs';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	userDetailActions,
} from '../../../../controller';

const {
	START_FETCH_USER_DETAIL,
	START_UPDATE_USER_DETAIL_BLOCK_BETTING,
	START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT,
	START_UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL,
	START_UPDATE_USER_DETAIL_FUNDS_PASSWORD,
	START_UPDATE_USER_DETAIL_FIN_PASSWORD,
	START_UPDATE_USER_DETAIL_LOGIN_PASSWORD,
	START_UPDATE_USER_DETAIL_STATUS,
	START_UPDATE_USER_DETAIL_NICKNAME,
	START_UPDATE_USER_DETAIL_TYPE,
	START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER,
	START_UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER,
	START_UPDATE_USER_DETAIL_ALERT_USER,
	START_UPDATE_USER_DETAIL_LEVEL,
	START_UPDATE_USER_DETAIL_PAYER,
} = actionTypes;
const {
	fetchUserDetailSuccessAction,
	fetchUserDetailFailedAction,
	updateUserDetailBlockBettingSuccessAction,
	updateUserDetailBlockBettingFailedAction,
	updateUserDetailBlockDepositSuccessAction,
	updateUserDetailBlockDepositFailedAction,
	updateUserDetailBlockWithdrawalSuccessAction,
	updateUserDetailBlockWithdrawalFailedAction,
	updateUserDetailFundsPasswordSuccessAction,
	updateUserDetailFundsPasswordFailedAction,
	updateUserDetailFinPasswordSuccessAction,
	updateUserDetailFinPasswordFailedAction,
	updateUserDetailLoginPasswordSuccessAction,
	updateUserDetailLoginPasswordFailedAction,
	updateUserDetailStatusSuccessAction,
	updateUserDetailStatusFailedAction,
	updateUserDetailNicknameSuccessAction,
	updateUserDetailNicknameFailedAction,
	updateUserDetailTypeSuccessAction,
	updateUserDetailTypeFailedAction,
	updateUserDetailBlockDepositTransferSuccessAction,
	updateUserDetailBlockDepositTransferFailedAction,
	updateUserDetailBlockDividendTransferSuccessAction,
	updateUserDetailBlockDividendTransferFailedAction,
	updateUserDetailAlertUserSuccessAction,
	updateUserDetailAlertUserFailedAction,
	updateUserDetailLevelSuccessAction,
	updateUserDeatilLevelFailedAction,
	updateUserDetailPayerSuccessAction,
	updateUserDetailPayerFailedAction,
} = userDetailActions;

export function fetchUserDetailEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_USER_DETAIL),
		switchMap(action => (
			of({
				// TODO call api
				response: fakeData,
			}).pipe(
				map(payload => payload.response),
				map(response => fetchUserDetailSuccessAction(response)),
				catchError(error => catchErrorMessageForEpics(error, fetchUserDetailFailedAction)),
			)
		))
	);
}

export function updateUserDetailBlockBettingEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_BLOCK_BETTING),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailBlockBettingSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailBlockBettingFailedAction)),
			);
		})
	);
}

export function updateUserDetailBlockDepositEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailBlockDepositSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailBlockDepositFailedAction)),
			);
		})
	);
}

export function updateUserDetailBlockWithdrawalEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailBlockWithdrawalSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailBlockWithdrawalFailedAction)),
			);
		})
	);
}

export function updateUserDetailFundsPasswordEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_FUNDS_PASSWORD),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailFundsPasswordSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailFundsPasswordFailedAction)),
			);
		})
	);
}

export function updateUserDetailFinPasswordEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_FIN_PASSWORD),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailFinPasswordSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailFinPasswordFailedAction)),
			);
		})
	);
}

export function updateUserDetailLoginPasswordEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_LOGIN_PASSWORD),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailLoginPasswordSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailLoginPasswordFailedAction)),
			);
		})
	);
}

export function updateUserDetailStatusEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_STATUS),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailStatusSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailStatusFailedAction)),
			);
		})
	);
}

export function updateUserDetailNicknameEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_NICKNAME),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailNicknameSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailNicknameFailedAction)),
			);
		})
	);
}

export function updateUserDetailTypeEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_TYPE),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailTypeSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailTypeFailedAction)),
			);
		})
	);
}

export function updateUserDetailBlockDepositTransferEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailBlockDepositTransferSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailBlockDepositTransferFailedAction)),
			);
		})
	);
}

export function updateUserDetailBlockDividendTransferEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailBlockDividendTransferSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailBlockDividendTransferFailedAction)),
			);
		})
	);
}

export function updateUserDetailAlertUserEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_ALERT_USER),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailAlertUserSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailAlertUserFailedAction)),
			);
		})
	);
}

export function updateUserDetailLevelEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_LEVEL),
		switchMap((action) => {
			const {
				data = {},
			} = action;

			return of({
				// TODO call api
				response: data,
			}).pipe(
				map(payload => payload.response),
				// TODO remove after use api
				delay(10),
				map(() => updateUserDetailLevelSuccessAction(data)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDeatilLevelFailedAction)),
			);
		})
	);
}

export function updateUserDetailPayerEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_USER_DETAIL_PAYER),
		switchMap((action) => {
			const {
				payer,
			} = action;

			return of({
				// TODO call api
				response: payer,
			}).pipe(
				map(payload => payload.response),
				map(() => updateUserDetailPayerSuccessAction(payer)),
				catchError(error => catchErrorMessageForEpics(error, updateUserDetailPayerFailedAction)),
			);
		})
	);
}

const fakeData = {
	id: 12,
	username: 'user1',
	iconUrl: 'https://i.pravatar.cc/100',
	nickname: 'User1 Nickname',
	payer: '楊欣如',
	type: 2,
	ancestors: [
		'user1',
		'user2',
		'user3',
		'user4',
		'user5',
		'user6',
		'user7',
		'user8',
		'user9',
		'user10',
	],
	details: {
		subordinateCount: 15,
		loginErrorCount: 8,
		teamBalance: 379345,
		createdBy: {
			username: '管理者',
		},
		bonus: {
			delta: -4,
		},
		level: {
			name: '第一层',
			index: 1,
		},
		policy: {
			blockDeposit: { isEnabled: false },
			blockWithdrawal: { isEnabled: false },
			blockBetting: { isEnabled: false },
			blockDepositTransfer: { isEnabled: false },
			blockActivityTransfer: { isEnabled: false },
			blockDividendTransfer: { isEnabled: false },
		},
		lastComment: {
			createdBy: {
				username: 'fin001',
				type: 4,
			},
			content: '本角刻八半西已國代法能成，存人主一選很常能光落想想。我美外安。形戰二香美的方校小求別，的電利獎對以小藝！模然們國乎國善果我？全的色主輕運大士能著技如事生願科密',
		},
		pinnedCommentIds: [
			{ _id: '0', },
			{ _id: '1', },
			{ _id: '2', },
			{ _id: '3', },
			{ _id: '4', },
		],
	},
	lastLoginAudit: {
		createdAt: '2018-09-29T17:23:40+00:00',
	},
	status: 'active',
	isOnline: true,
	createdAt: '2018-09-29T17:23:00+00:00',
	credentials: {
		loginPassword: 'tes****55555',
		fundsPassword: 'tes****66666',
		finPassword: '',
	},
};

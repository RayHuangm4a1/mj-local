import { ofType, } from 'redux-observable';
import { of, } from 'rxjs';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	actionTypes,
	teamMemberActions,
} from '../../../controller';
import { rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_ENABLE_TEAM_MEMBER_ACCOUNT,
	START_ENABLE_TEAM_MEMBER_BETTING,
	START_ENABLE_TEAM_MEMBER_DEPOSIT,
	START_ENABLE_TEAM_MEMBER_FUNDS,
	START_ENABLE_TEAM_MEMBER_WITHDRAW,
} = actionTypes;

const {
	enableTeamMemberAccountSuccessAction,
	enableTeamMemberAccountFailedAction,
	enableTeamMemberBettingSuccessAction,
	enableTeamMemberBettingFailedAction,
	enableTeamMemberDepositSuccessAction,
	enableTeamMemberDepositFailedAction,
	enableTeamMemberFundsSuccessAction,
	enableTeamMemberFundsFailedAction,
	enableTeamMemberWithdrawSuccessAction,
	enableTeamMemberWithdrawFailedAction,
} = teamMemberActions;

// TODO DELETE teams/memberId=:memberId/blocked
export function enableTeamMemberAccountEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_TEAM_MEMBER_ACCOUNT),
		switchMap((action) => rxjsApiFetcher
			.delete(`teams/memberId=${action.memberId}/blocked`)
			.pipe(
				map(() => enableTeamMemberAccountSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableTeamMemberAccountFailedAction))
			)
		)
	);
}

export function enableTeamMemberBettingEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_TEAM_MEMBER_BETTING),
		switchMap(({ memberId, }) => (
			rxjsApiFetcher
				.post(`teams/memberId=${memberId}/betable`)
				.pipe(
					map(() => enableTeamMemberBettingSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, enableTeamMemberBettingFailedAction))
				)
		))
	);
}

export function enableTeamMemberDepositEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_TEAM_MEMBER_DEPOSIT),
		switchMap(({ memberId, }) => (
			rxjsApiFetcher
				.post(`teams/memberId=${memberId}/depositable`)
				.pipe(
					map(() => enableTeamMemberDepositSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, enableTeamMemberDepositFailedAction))
				)
		))
	);
}

export function enableTeamMemberFundsEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_TEAM_MEMBER_FUNDS),
		switchMap((action) => rxjsApiFetcher
			.post(`teams/memberId=${action.memberId}/fundsable`)
			.pipe(
				map(() => enableTeamMemberFundsSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableTeamMemberFundsFailedAction))
			)
		)
	);
}

export function enableTeamMemberWithdrawEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_TEAM_MEMBER_WITHDRAW),
		switchMap(action => (rxjsApiFetcher
			.post(`teams/memberId=${action.memberId}/withdrawable`)
			.pipe(
				map(() => enableTeamMemberWithdrawSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableTeamMemberWithdrawFailedAction))
			)
		))
	);
}

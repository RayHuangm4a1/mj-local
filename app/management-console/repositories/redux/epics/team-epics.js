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
	teamActions,
} from '../../../controller';
import { rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_FETCH_TEAM_CHILDREN,
	START_FETCH_TEAM_STATS,
	START_ENABLE_TEAM_ACCOUNT,
	START_DISABLE_TEAM_ACCOUNT,
	START_ENABLE_TEAM_BETTING,
	START_DISABLE_TEAM_BETTING,
	START_ENABLE_TEAM_DEPOSIT,
	START_DISABLE_TEAM_DEPOSIT,
	START_ENABLE_TEAM_FUNDS,
	START_DISABLE_TEAM_FUNDS,
	START_ENABLE_TEAM_SUBORDINATE_CREATION,
	START_DISABLE_TEAM_SUBORDINATE_CREATION,
	START_ENABLE_TEAM_WITHDRAW,
	START_DISABLE_TEAM_WITHDRAW,
} = actionTypes;

const {
	fetchTeamChildrenSuccessAction,
	fetchTeamChildrenFailedAction,
	fetchTeamStatsSuccessAction,
	fetchTeamStatsFailedAction,
	enableTeamAccountSuccessAction,
	enableTeamAccountFailedAction,
	disableTeamAccountSuccessAction,
	disableTeamAccountFailedAction,
	enableTeamBettingSuccessAction,
	enableTeamBettingFailedAction,
	disableTeamBettingSuccessAction,
	disableTeamBettingFailedAction,
	enableTeamDepositSuccessAction,
	enableTeamDepositFailedAction,
	disableTeamDepositSuccessAction,
	disableTeamDepositFailedAction,
	enableTeamFundsSuccessAction,
	enableTeamFundsFailedAction,
	disableTeamFundsSuccessAction,
	disableTeamFundsFailedAction,
	enableTeamSubordinateCreationSuccessAction,
	enableTeamSubordinateCreationFailedAction,
	disableTeamSubordinateCreationSuccessAction,
	disableTeamSubordinateCreationFailedAction,
	enableTeamWithdrawSuccessAction,
	enableTeamWithdrawFailedAction,
	disableTeamWithdrawSuccessAction,
	disableTeamWithdrawFailedAction,
} = teamActions;

export function fetchTeamChildrenEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_TEAM_CHILDREN),
		switchMap(({ leaderId, }) => (
			rxjsApiFetcher.get(`/teams/leaderId=${leaderId}/children`)
				.pipe(
					map(payload => fetchTeamChildrenSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, fetchTeamChildrenFailedAction))
				)
		))
	);
}
export function fetchTeamStatsEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_TEAM_STATS),
		switchMap(({ leaderId, }) => rxjsApiFetcher
			.get(`/teams/leaderId=${leaderId}/stats`)
			.pipe(
				map(payload => fetchTeamStatsSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchTeamStatsFailedAction))
			)
		)
	);
}
export function enableTeamAccountEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_TEAM_ACCOUNT),
		switchMap((action) => rxjsApiFetcher
			.delete(`teams/leaderId=${action.leaderId}/blocked`)
			.pipe(
				map(() => enableTeamAccountSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableTeamAccountFailedAction))
			)
		)
	);
}
export function disableTeamAccountEpic(action$) {
	return action$.pipe(
		ofType(START_DISABLE_TEAM_ACCOUNT),
		switchMap((action) => rxjsApiFetcher
			.post(`teams/leaderId=${action.leaderId}/blocked`)
			.pipe(
				map(() => disableTeamAccountSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, disableTeamAccountFailedAction))
			)
		)
	);
}

export function enableTeamBettingEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_TEAM_BETTING),
		switchMap(({ leaderId, }) => (
			rxjsApiFetcher
				.post(`teams/leaderId=${leaderId}/betable`)
				.pipe(
					map(() => enableTeamBettingSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, enableTeamBettingFailedAction))
				)
		))
	);
}
export function disableTeamBettingEpic(action$) {
	return action$.pipe(
		ofType(START_DISABLE_TEAM_BETTING),
		switchMap(({ leaderId, }) => (
			rxjsApiFetcher
				.delete(`teams/leaderId=${leaderId}/betable`)
				.pipe(
					map(() => disableTeamBettingSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, disableTeamBettingFailedAction))
				)
		))
	);
}

export function enableTeamDepositEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_TEAM_DEPOSIT),
		switchMap(({ leaderId, }) => (
			rxjsApiFetcher
				.post(`teams/leaderId=${leaderId}/depositable`)
				.pipe(
					map(() => enableTeamDepositSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, enableTeamDepositFailedAction))
				)
		))
	);
}
export function disableTeamDepositEpic(action$) {
	return action$.pipe(
		ofType(START_DISABLE_TEAM_DEPOSIT),
		switchMap(({ leaderId, }) => (
			rxjsApiFetcher
				.delete(`teams/leaderId=${leaderId}/depositable`)
				.pipe(
					map(() => disableTeamDepositSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, disableTeamDepositFailedAction))
				)
		))
	);
}

export function enableTeamFundsEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_TEAM_FUNDS),
		switchMap((action) => rxjsApiFetcher
			.post(`teams/leaderId=${action.leaderId}/fundsable`)
			.pipe(
				map(() => enableTeamFundsSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableTeamFundsFailedAction))
			)
		)
	);
}
export function disableTeamFundsEpic(action$) {
	return action$.pipe(
		ofType(START_DISABLE_TEAM_FUNDS),
		switchMap((action) => rxjsApiFetcher
			.delete(`teams/leaderId=${action.leaderId}/fundsable`)
			.pipe(
				map(() => disableTeamFundsSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, disableTeamFundsFailedAction))
			)
		)
	);
}

export function enableTeamSubordinateCreationEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_TEAM_SUBORDINATE_CREATION),
		switchMap(({ leaderId, }) => (
			rxjsApiFetcher
				.post(`teams/leaderId=${leaderId}/creatable`)
				.pipe(
					map(() => enableTeamSubordinateCreationSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, enableTeamSubordinateCreationFailedAction))
				)
		))
	);
}
export function disableTeamSubordinateCreationEpic(action$) {
	return action$.pipe(
		ofType(START_DISABLE_TEAM_SUBORDINATE_CREATION),
		switchMap(({ leaderId, }) => (
			rxjsApiFetcher
				.delete(`teams/leaderId=${leaderId}/creatable`)
				.pipe(
					map(() => disableTeamSubordinateCreationSuccessAction()),
					catchError(error => catchErrorMessageForEpics(error, disableTeamSubordinateCreationFailedAction))
				)
		))
	);
}

export function enableTeamWithdrawEpic(action$) {
	return action$.pipe(
		ofType(START_ENABLE_TEAM_WITHDRAW),
		switchMap(action => (rxjsApiFetcher
			.post(`teams/leaderId=${action.leaderId}/withdrawable`)
			.pipe(
				map(() => enableTeamWithdrawSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, enableTeamWithdrawFailedAction))
			)
		))
	);
}
export function disableTeamWithdrawEpic(action$) {
	return action$.pipe(
		ofType(START_DISABLE_TEAM_WITHDRAW),
		switchMap(action => (rxjsApiFetcher
			.delete(`teams/leaderId=${action.leaderId}/withdrawable`)
			.pipe(
				map(() => disableTeamWithdrawSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, disableTeamWithdrawFailedAction))
			)
		))
	);
}

const fakeData = [
	{
		id: 101,
		username: 'test0101',
	},
	{
		id: 102,
		username: 'test0102',
	},
	{
		id: 103,
		username: 'test0103',
	},
];

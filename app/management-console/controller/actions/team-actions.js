import {
	START_FETCH_TEAM_CHILDREN,
	FETCH_TEAM_CHILDREN_SUCCESS,
	FETCH_TEAM_CHILDREN_FAILED,
	START_FETCH_TEAM_STATS,
	FETCH_TEAM_STATS_SUCCESS,
	FETCH_TEAM_STATS_FAILED,
	START_ENABLE_TEAM_ACCOUNT,
	ENABLE_TEAM_ACCOUNT_SUCCESS,
	ENABLE_TEAM_ACCOUNT_FAILED,
	START_DISABLE_TEAM_ACCOUNT,
	DISABLE_TEAM_ACCOUNT_SUCCESS,
	DISABLE_TEAM_ACCOUNT_FAILED,
	START_ENABLE_TEAM_BETTING,
	ENABLE_TEAM_BETTING_SUCCESS,
	ENABLE_TEAM_BETTING_FAILED,
	START_DISABLE_TEAM_BETTING,
	DISABLE_TEAM_BETTING_SUCCESS,
	DISABLE_TEAM_BETTING_FAILED,
	START_ENABLE_TEAM_DEPOSIT,
	ENABLE_TEAM_DEPOSIT_SUCCESS,
	ENABLE_TEAM_DEPOSIT_FAILED,
	START_DISABLE_TEAM_DEPOSIT,
	DISABLE_TEAM_DEPOSIT_SUCCESS,
	DISABLE_TEAM_DEPOSIT_FAILED,
	START_ENABLE_TEAM_FUNDS,
	ENABLE_TEAM_FUNDS_SUCCESS,
	ENABLE_TEAM_FUNDS_FAILED,
	START_DISABLE_TEAM_FUNDS,
	DISABLE_TEAM_FUNDS_SUCCESS,
	DISABLE_TEAM_FUNDS_FAILED,
	START_ENABLE_TEAM_SUBORDINATE_CREATION,
	ENABLE_TEAM_SUBORDINATE_CREATION_SUCCESS,
	ENABLE_TEAM_SUBORDINATE_CREATION_FAILED,
	START_DISABLE_TEAM_SUBORDINATE_CREATION,
	DISABLE_TEAM_SUBORDINATE_CREATION_SUCCESS,
	DISABLE_TEAM_SUBORDINATE_CREATION_FAILED,
	START_ENABLE_TEAM_WITHDRAW,
	ENABLE_TEAM_WITHDRAW_SUCCESS,
	ENABLE_TEAM_WITHDRAW_FAILED,
	START_DISABLE_TEAM_WITHDRAW,
	DISABLE_TEAM_WITHDRAW_SUCCESS,
	DISABLE_TEAM_WITHDRAW_FAILED,
} from './action-types';

export function fetchTeamChildrenAction(leaderId) {
	return {
		type: START_FETCH_TEAM_CHILDREN,
		leaderId,
	};
}
export function fetchTeamChildrenSuccessAction({
	data: { children, ancestors, },
	numOfItems,
	numOfPages,
}) {
	return {
		type: FETCH_TEAM_CHILDREN_SUCCESS,
		children,
		ancestors,
		numOfItems,
		numOfPages,
	};
}
export function fetchTeamChildrenFailedAction(error, errorMessage) {
	return {
		type: FETCH_TEAM_CHILDREN_FAILED,
		error,
		errorMessage,
	};
}
export function fetchTeamStatsAction(leaderId) {
	return {
		type: START_FETCH_TEAM_STATS,
		leaderId,
	};
}
export function fetchTeamStatsSuccessAction(stats) {
	return {
		type: FETCH_TEAM_STATS_SUCCESS,
		stats,
	};
}
export function fetchTeamStatsFailedAction(error, errorMessage) {
	return {
		type: FETCH_TEAM_STATS_FAILED,
		error,
		errorMessage,
	};
}

export function enableTeamAccountAction(leaderId) {
	return {
		type: START_ENABLE_TEAM_ACCOUNT,
		leaderId,
	};
}
export function enableTeamAccountSuccessAction() {
	return {
		type: ENABLE_TEAM_ACCOUNT_SUCCESS,
	};
}
export function enableTeamAccountFailedAction(error, errorMessage) {
	return {
		type: ENABLE_TEAM_ACCOUNT_FAILED,
		error,
		errorMessage,
	};
}
export function disableTeamAccountAction(leaderId) {
	return {
		type: START_DISABLE_TEAM_ACCOUNT,
		leaderId,
	};
}
export function disableTeamAccountSuccessAction() {
	return {
		type: DISABLE_TEAM_ACCOUNT_SUCCESS,
	};
}
export function disableTeamAccountFailedAction(error, errorMessage) {
	return {
		type: DISABLE_TEAM_ACCOUNT_FAILED,
		error,
		errorMessage,
	};
}

export function enableTeamBettingAction(leaderId) {
	return {
		type: START_ENABLE_TEAM_BETTING,
		leaderId,
	};
}
export function enableTeamBettingSuccessAction() {
	return {
		type: ENABLE_TEAM_BETTING_SUCCESS,
	};
}
export function enableTeamBettingFailedAction(error, errorMessage) {
	return {
		type: ENABLE_TEAM_BETTING_FAILED,
		error,
		errorMessage,
	};
}
export function disableTeamBettingAction(leaderId) {
	return {
		type: START_DISABLE_TEAM_BETTING,
		leaderId,
	};
}
export function disableTeamBettingSuccessAction() {
	return {
		type: DISABLE_TEAM_BETTING_SUCCESS,
	};
}
export function disableTeamBettingFailedAction(error, errorMessage) {
	return {
		type: DISABLE_TEAM_BETTING_FAILED,
		error,
		errorMessage,
	};
}

export function enableTeamDepositAction(leaderId) {
	return {
		type: START_ENABLE_TEAM_DEPOSIT,
		leaderId,
	};
}
export function enableTeamDepositSuccessAction() {
	return {
		type: ENABLE_TEAM_DEPOSIT_SUCCESS,
	};
}
export function enableTeamDepositFailedAction(error, errorMessage) {
	return {
		type: ENABLE_TEAM_DEPOSIT_FAILED,
		error,
		errorMessage,
	};
}
export function disableTeamDepositAction(leaderId) {
	return {
		type: START_DISABLE_TEAM_DEPOSIT,
		leaderId,
	};
}
export function disableTeamDepositSuccessAction() {
	return {
		type: DISABLE_TEAM_DEPOSIT_SUCCESS,
	};
}
export function disableTeamDepositFailedAction(error, errorMessage) {
	return {
		type: DISABLE_TEAM_DEPOSIT_FAILED,
		error,
		errorMessage,
	};
}

export function enableTeamFundsAction(leaderId) {
	return {
		type: START_ENABLE_TEAM_FUNDS,
		leaderId,
	};
}
export function enableTeamFundsSuccessAction() {
	return {
		type: ENABLE_TEAM_FUNDS_SUCCESS,
	};
}
export function enableTeamFundsFailedAction(error, errorMessage) {
	return {
		type: ENABLE_TEAM_FUNDS_FAILED,
		error,
		errorMessage,
	};
}
export function disableTeamFundsAction(leaderId) {
	return {
		type: START_DISABLE_TEAM_FUNDS,
		leaderId,
	};
}
export function disableTeamFundsSuccessAction() {
	return {
		type: DISABLE_TEAM_FUNDS_SUCCESS,
	};
}
export function disableTeamFundsFailedAction(error, errorMessage) {
	return {
		type: DISABLE_TEAM_FUNDS_FAILED,
		error,
		errorMessage,
	};
}

export function enableTeamSubordinateCreationAction(leaderId) {
	return {
		type: START_ENABLE_TEAM_SUBORDINATE_CREATION,
		leaderId,
	};
}
export function enableTeamSubordinateCreationSuccessAction() {
	return {
		type: ENABLE_TEAM_SUBORDINATE_CREATION_SUCCESS,
	};
}
export function enableTeamSubordinateCreationFailedAction(error, errorMessage) {
	return {
		type: ENABLE_TEAM_SUBORDINATE_CREATION_FAILED,
		error,
		errorMessage,
	};
}
export function disableTeamSubordinateCreationAction(leaderId) {
	return {
		type: START_DISABLE_TEAM_SUBORDINATE_CREATION,
		leaderId,
	};
}
export function disableTeamSubordinateCreationSuccessAction() {
	return {
		type: DISABLE_TEAM_SUBORDINATE_CREATION_SUCCESS,
	};
}
export function disableTeamSubordinateCreationFailedAction(error, errorMessage) {
	return {
		type: DISABLE_TEAM_SUBORDINATE_CREATION_FAILED,
		error,
		errorMessage,
	};
}

export function enableTeamWithdrawAction(leaderId) {
	return {
		type: START_ENABLE_TEAM_WITHDRAW,
		leaderId,
	};
}
export function enableTeamWithdrawSuccessAction() {
	return {
		type: ENABLE_TEAM_WITHDRAW_SUCCESS,
	};
}
export function enableTeamWithdrawFailedAction(error, errorMessage) {
	return {
		type: ENABLE_TEAM_WITHDRAW_FAILED,
		error,
		errorMessage,
	};
}
export function disableTeamWithdrawAction(leaderId) {
	return {
		type: START_DISABLE_TEAM_WITHDRAW,
		leaderId,
	};
}
export function disableTeamWithdrawSuccessAction() {
	return {
		type: DISABLE_TEAM_WITHDRAW_SUCCESS,
	};
}
export function disableTeamWithdrawFailedAction(error, errorMessage) {
	return {
		type: DISABLE_TEAM_WITHDRAW_FAILED,
		error,
		errorMessage,
	};
}

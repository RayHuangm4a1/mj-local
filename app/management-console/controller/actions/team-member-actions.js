import {
	START_ENABLE_TEAM_MEMBER_ACCOUNT,
	ENABLE_TEAM_MEMBER_ACCOUNT_SUCCESS,
	ENABLE_TEAM_MEMBER_ACCOUNT_FAILED,
	START_ENABLE_TEAM_MEMBER_BETTING,
	ENABLE_TEAM_MEMBER_BETTING_SUCCESS,
	ENABLE_TEAM_MEMBER_BETTING_FAILED,
	START_ENABLE_TEAM_MEMBER_DEPOSIT,
	ENABLE_TEAM_MEMBER_DEPOSIT_SUCCESS,
	ENABLE_TEAM_MEMBER_DEPOSIT_FAILED,
	START_ENABLE_TEAM_MEMBER_FUNDS,
	ENABLE_TEAM_MEMBER_FUNDS_SUCCESS,
	ENABLE_TEAM_MEMBER_FUNDS_FAILED,
	START_ENABLE_TEAM_MEMBER_WITHDRAW,
	ENABLE_TEAM_MEMBER_WITHDRAW_SUCCESS,
	ENABLE_TEAM_MEMBER_WITHDRAW_FAILED,
} from './action-types';

export function enableTeamMemberAccountAction(memberId) {
	return {
		type: START_ENABLE_TEAM_MEMBER_ACCOUNT,
		memberId,
	};
}
export function enableTeamMemberAccountSuccessAction() {
	return {
		type: ENABLE_TEAM_MEMBER_ACCOUNT_SUCCESS,
	};
}
export function enableTeamMemberAccountFailedAction(error, errorMessage) {
	return {
		type: ENABLE_TEAM_MEMBER_ACCOUNT_FAILED,
		error,
		errorMessage,
	};
}

export function enableTeamMemberBettingAction(memberId) {
	return {
		type: START_ENABLE_TEAM_MEMBER_BETTING,
		memberId,
	};
}
export function enableTeamMemberBettingSuccessAction() {
	return {
		type: ENABLE_TEAM_MEMBER_BETTING_SUCCESS,
	};
}
export function enableTeamMemberBettingFailedAction(error, errorMessage) {
	return {
		type: ENABLE_TEAM_MEMBER_BETTING_FAILED,
		error,
		errorMessage,
	};
}

export function enableTeamMemberDepositAction(memberId) {
	return {
		type: START_ENABLE_TEAM_MEMBER_DEPOSIT,
		memberId,
	};
}
export function enableTeamMemberDepositSuccessAction() {
	return {
		type: ENABLE_TEAM_MEMBER_DEPOSIT_SUCCESS,
	};
}
export function enableTeamMemberDepositFailedAction(error, errorMessage) {
	return {
		type: ENABLE_TEAM_MEMBER_DEPOSIT_FAILED,
		error,
		errorMessage,
	};
}

export function enableTeamMemberFundsAction(memberId) {
	return {
		type: START_ENABLE_TEAM_MEMBER_FUNDS,
		memberId,
	};
}
export function enableTeamMemberFundsSuccessAction() {
	return {
		type: ENABLE_TEAM_MEMBER_FUNDS_SUCCESS,
	};
}
export function enableTeamMemberFundsFailedAction(error, errorMessage) {
	return {
		type: ENABLE_TEAM_MEMBER_FUNDS_FAILED,
		error,
		errorMessage,
	};
}

export function enableTeamMemberWithdrawAction(memberId) {
	return {
		type: START_ENABLE_TEAM_MEMBER_WITHDRAW,
		memberId,
	};
}
export function enableTeamMemberWithdrawSuccessAction() {
	return {
		type: ENABLE_TEAM_MEMBER_WITHDRAW_SUCCESS,
	};
}
export function enableTeamMemberWithdrawFailedAction(error, errorMessage) {
	return {
		type: ENABLE_TEAM_MEMBER_WITHDRAW_FAILED,
		error,
		errorMessage,
	};
}

import {
	START_FETCH_USER_DETAIL,
	FETCH_USER_DETAIL_SUCCESS,
	FETCH_USER_DETAIL_FAILED,
	START_UPDATE_USER_DETAIL_BLOCK_BETTING,
	UPDATE_USER_DETAIL_BLOCK_BETTING_SUCCESS,
	UPDATE_USER_DETAIL_BLOCK_BETTING_FAILED,
	START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT,
	UPDATE_USER_DETAIL_BLOCK_DEPOSIT_SUCCESS,
	UPDATE_USER_DETAIL_BLOCK_DEPOSIT_FAILED,
	START_UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL,
	UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL_SUCCESS,
	UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL_FAILED,
	START_UPDATE_USER_DETAIL_FUNDS_PASSWORD,
	UPDATE_USER_DETAIL_FUNDS_PASSWORD_SUCCESS,
	UPDATE_USER_DETAIL_FUNDS_PASSWORD_FAILED,
	START_UPDATE_USER_DETAIL_FIN_PASSWORD,
	UPDATE_USER_DETAIL_FIN_PASSWORD_SUCCESS,
	UPDATE_USER_DETAIL_FIN_PASSWORD_FAILED,
	START_UPDATE_USER_DETAIL_LOGIN_PASSWORD,
	UPDATE_USER_DETAIL_LOGIN_PASSWORD_SUCCESS,
	UPDATE_USER_DETAIL_LOGIN_PASSWORD_FAILED,
	START_UPDATE_USER_DETAIL_STATUS,
	UPDATE_USER_DETAIL_STATUS_SUCCESS,
	UPDATE_USER_DETAIL_STATUS_FAILED,
	START_UPDATE_USER_DETAIL_NICKNAME,
	UPDATE_USER_DETAIL_NICKNAME_SUCCESS,
	UPDATE_USER_DETAIL_NICKNAME_FAILED,
	START_UPDATE_USER_DETAIL_TYPE,
	UPDATE_USER_DETAIL_TYPE_SUCCESS,
	UPDATE_USER_DETAIL_TYPE_FAILED,
	START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER,
	UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER_SUCCESS,
	UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER_FAILED,
	START_UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER,
	UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER_SUCCESS,
	UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER_FAILED,
	START_UPDATE_USER_DETAIL_ALERT_USER,
	UPDATE_USER_DETAIL_ALERT_USER_SUCCESS,
	UPDATE_USER_DETAIL_ALERT_USER_FAILED,
	START_UPDATE_USER_DETAIL_LEVEL,
	UPDATE_USER_DETAIL_LEVEL_SUCCESS,
	UPDATE_USER_DETAIL_LEVEL_FAILED,
	START_UPDATE_USER_DETAIL_PAYER,
	UPDATE_USER_DETAIL_PAYER_SUCCESS,
	UPDATE_USER_DETAIL_PAYER_FAILED,
} from '../action-types';

export function fetchUserDetailAction(userId) {
	return {
		type: START_FETCH_USER_DETAIL,
		userId,
	};
}
export function fetchUserDetailSuccessAction(payload) {
	return {
		type: FETCH_USER_DETAIL_SUCCESS,
		payload,
	};
}
export function fetchUserDetailFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_DETAIL_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailBlockBettingAction(data = {}) {
	const { blockBetting = {}, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_BLOCK_BETTING,
		data: {
			blockBetting,
		},
	};
}
export function updateUserDetailBlockBettingSuccessAction(data = {}) {
	const { blockBetting = {}, } = data;

	return {
		type: UPDATE_USER_DETAIL_BLOCK_BETTING_SUCCESS,
		data: {
			blockBetting,
		},
	};
}
export function updateUserDetailBlockBettingFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_BLOCK_BETTING_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailBlockDepositAction(data = {}) {
	const { blockDeposit = {}, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT,
		data: {
			blockDeposit,
		},
	};
}
export function updateUserDetailBlockDepositSuccessAction(data = {}) {
	const { blockDeposit = {}, } = data;

	return {
		type: UPDATE_USER_DETAIL_BLOCK_DEPOSIT_SUCCESS,
		data: {
			blockDeposit,
		},
	};
}
export function updateUserDetailBlockDepositFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_BLOCK_DEPOSIT_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailBlockWithdrawalAction(data = {}) {
	const { blockWithdrawal = {}, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL,
		data: {
			blockWithdrawal,
		},
	};
}
export function updateUserDetailBlockWithdrawalSuccessAction(data = {}) {
	const { blockWithdrawal = {}, } = data;

	return {
		type: UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL_SUCCESS,
		data: {
			blockWithdrawal,
		},
	};
}
export function updateUserDetailBlockWithdrawalFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailFundsPasswordAction(data = {}) {
	const { fundsPassword, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_FUNDS_PASSWORD,
		data: {
			fundsPassword,
		},
	};
}
export function updateUserDetailFundsPasswordSuccessAction(data = {}) {
	const { fundsPassword, } = data;

	return {
		type: UPDATE_USER_DETAIL_FUNDS_PASSWORD_SUCCESS,
		data: {
			fundsPassword,
		},
	};
}
export function updateUserDetailFundsPasswordFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_FUNDS_PASSWORD_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailFinPasswordAction(data = {}) {
	const { finPassword, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_FIN_PASSWORD,
		data: { finPassword, },
	};
}
export function updateUserDetailFinPasswordSuccessAction(data = {}) {
	const { finPassword, } = data;

	return {
		type: UPDATE_USER_DETAIL_FIN_PASSWORD_SUCCESS,
		data: { finPassword, },
	};
}
export function updateUserDetailFinPasswordFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_FIN_PASSWORD_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailLoginPasswordAction(data = {}) {
	const { loginPassword, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_LOGIN_PASSWORD,
		data: {
			loginPassword,
		},
	};
}
export function updateUserDetailLoginPasswordSuccessAction(data = {}) {
	const { loginPassword, } = data;

	return {
		type: UPDATE_USER_DETAIL_LOGIN_PASSWORD_SUCCESS,
		data: {
			loginPassword,
		},
	};
}
export function updateUserDetailLoginPasswordFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_LOGIN_PASSWORD_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailStatusAction(data = {}) {
	const { status, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_STATUS,
		data: {
			status,
		},
	};
}
export function updateUserDetailStatusSuccessAction(data = {}) {
	const { status, } = data;

	return {
		type: UPDATE_USER_DETAIL_STATUS_SUCCESS,
		data: {
			status,
		},
	};
}
export function updateUserDetailStatusFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_STATUS_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailNicknameAction(data = {}) {
	const { nickname, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_NICKNAME,
		data: {
			nickname,
		},
	};
}
export function updateUserDetailNicknameSuccessAction(data = {}) {
	const { nickname, } = data;

	return {
		type: UPDATE_USER_DETAIL_NICKNAME_SUCCESS,
		data: {
			nickname,
		},
	};
}
export function updateUserDetailNicknameFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_NICKNAME_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailTypeAction(data = {}) {
	const { type, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_TYPE,
		data: {
			type,
		},
	};
}
export function updateUserDetailTypeSuccessAction(data = {}) {
	const { type, } = data;

	return {
		type: UPDATE_USER_DETAIL_TYPE_SUCCESS,
		data: {
			type,
		},
	};
}
export function updateUserDetailTypeFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_TYPE_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailBlockDepositTransferAction(data = {}) {
	const { blockDepositTransfer = {}, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER,
		data: {
			blockDepositTransfer,
		},
	};
}
export function updateUserDetailBlockDepositTransferSuccessAction(data = {}) {
	const { blockDepositTransfer = {}, } = data;

	return {
		type: UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER_SUCCESS,
		data: {
			blockDepositTransfer,
		},
	};
}
export function updateUserDetailBlockDepositTransferFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailBlockDividendTransferAction(data = {}) {
	const { blockDividendTransfer = {}, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER,
		data: {
			blockDividendTransfer,
		},
	};
}
export function updateUserDetailBlockDividendTransferSuccessAction(data = {}) {
	const { blockDividendTransfer = {}, } = data;

	return {
		type: UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER_SUCCESS,
		data: {
			blockDividendTransfer,
		},
	};
}
export function updateUserDetailBlockDividendTransferFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailAlertUserAction(data = {}) {
	const { alertUser = {}, } = data;

	return {
		type: START_UPDATE_USER_DETAIL_ALERT_USER,
		data: {
			alertUser,
		},
	};
}
export function updateUserDetailAlertUserSuccessAction(data = {}) {
	const { alertUser = {}, } = data;

	return {
		type: UPDATE_USER_DETAIL_ALERT_USER_SUCCESS,
		data: {
			alertUser,
		},
	};
}
export function updateUserDetailAlertUserFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_ALERT_USER_FAILED,
		error,
		errorMessage,
	};
}
export function updateUserDetailLevelAction({ level, }) {
	return {
		type: START_UPDATE_USER_DETAIL_LEVEL,
		data: {
			level,
		},
	};
}
export function updateUserDetailLevelSuccessAction({ level, }) {
	return {
		type: UPDATE_USER_DETAIL_LEVEL_SUCCESS,
		data: {
			level,
		},
	};
}
export function updateUserDeatilLevelFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_LEVEL_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserDetailPayerAction(payer) {
	return {
		type: START_UPDATE_USER_DETAIL_PAYER,
		payer,
	};
}
export function updateUserDetailPayerSuccessAction(payer) {
	return {
		type: UPDATE_USER_DETAIL_PAYER_SUCCESS,
		payer,
	};
}
export function updateUserDetailPayerFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_DETAIL_PAYER_FAILED,
		error,
		errorMessage,
	};
}

import {
	START_FETCH_USER_PROFILE,
	FETCH_USER_PROFILE_SUCCESS,
	FETCH_USER_PROFILE_FAILED,
	START_ENABLE_USER,
	ENABLE_USER_SUCCESS,
	ENABLE_USER_FAILED,
	START_DISABLE_USER,
	DISABLE_USER_SUCCESS,
	DISABLE_USER_FAILED,
	START_UPDATE_USER_NICKNAME,
	UPDATE_USER_NICKNAME_SUCCESS,
	UPDATE_USER_NICKNAME_FAILED,
	START_UPDATE_USER_PAYER,
	UPDATE_USER_PAYER_SUCCESS,
	UPDATE_USER_PAYER_FAILED,
	START_UPDATE_USER_ZHUANDIAN,
	UPDATE_USER_ZHUANDIAN_SUCCESS,
	UPDATE_USER_ZHUANDIAN_FAILED,
	START_UPDATE_USER_TYPE,
	UPDATE_USER_TYPE_SUCCESS,
	UPDATE_USER_TYPE_FAILED,
	START_UPDATE_USER_GREETING,
	UPDATE_USER_GREETING_SUCCESS,
	UPDATE_USER_GREETING_FAILED,
	START_ENABLE_USER_FUNDS,
	ENABLE_USER_FUNDS_SUCCESS,
	ENABLE_USER_FUNDS_FAILED,
	START_DISABLE_USER_FUNDS,
	DISABLE_USER_FUNDS_SUCCESS,
	DISABLE_USER_FUNDS_FAILED,
	START_ENABLE_USER_BETTING,
	ENABLE_USER_BETTING_SUCCESS,
	ENABLE_USER_BETTING_FAILED,
	START_DISABLE_USER_BETTING,
	DISABLE_USER_BETTING_SUCCESS,
	DISABLE_USER_BETTING_FAILED,
	START_ENABLE_USER_DIVIDEND,
	ENABLE_USER_DIVIDEND_SUCCESS,
	ENABLE_USER_DIVIDEND_FAILED,
	START_DISABLE_USER_DIVIDEND,
	DISABLE_USER_DIVIDEND_SUCCESS,
	DISABLE_USER_DIVIDEND_FAILED,
	START_DISABLE_USER_TRANSFER,
	DISABLE_USER_TRANSFER_SUCCESS,
	DISABLE_USER_TRANSFER_FAILED,
	START_ENABLE_USER_TRANSFER,
	ENABLE_USER_TRANSFER_SUCCESS,
	ENABLE_USER_TRANSFER_FAILED,
	START_ENABLE_USER_WITHDRAWABLE,
	ENABLE_USER_WITHDRAWABLE_SUCCESS,
	ENABLE_USER_WITHDRAWABLE_FAILED,
	START_DISABLE_USER_WITHDRAWABLE,
	DISABLE_USER_WITHDRAWABLE_SUCCESS,
	DISABLE_USER_WITHDRAWABLE_FAILED,
	START_ENABLE_USER_DEPOSIT,
	ENABLE_USER_DEPOSIT_SUCCESS,
	ENABLE_USER_DEPOSIT_FAILED,
	START_DISABLE_USER_DEPOSIT,
	DISABLE_USER_DEPOSIT_SUCCESS,
	DISABLE_USER_DEPOSIT_FAILED,
	START_UPDATE_USER_BONUS,
	UPDATE_USER_BONUS_SUCCESS,
	UPDATE_USER_BONUS_FAILED,
	START_UPDATE_USER_FIXED_WAGE,
	UPDATE_USER_FIXED_WAGE_SUCCESS,
	UPDATE_USER_FIXED_WAGE_FAILED,
} from '../action-types';

export function fetchUserProfileAction(userId) {
	return {
		type: START_FETCH_USER_PROFILE,
		userId,
	};
}
export function fetchUserProfileSuccessAction(profile) {
	return {
		type: FETCH_USER_PROFILE_SUCCESS,
		profile,
	};
}
export function fetchUserProfileFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_PROFILE_FAILED,
		error,
		errorMessage,
	};
}

export function enableUserAction(userId) {
	return {
		type: START_ENABLE_USER,
		userId,
	};
}
export function enableUserSuccessAction() {
	return {
		type: ENABLE_USER_SUCCESS
	};
}
export function enableUserFailedAction(error, errorMessage) {
	return {
		type: ENABLE_USER_FAILED,
		error,
		errorMessage,
	};
}
export function updateUserNicknameAction(userId, nickname) {
	return {
		type: START_UPDATE_USER_NICKNAME,
		userId,
		nickname,
	};
}
export function updateUserNicknameSuccessAction() {
	return {
		type: UPDATE_USER_NICKNAME_SUCCESS,
	};
}
export function updateUserNicknameFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_NICKNAME_FAILED,
		error,
		errorMessage,
	};
}
export function updateUserGreetingAction(userId, greeting) {
	return {
		type: START_UPDATE_USER_GREETING,
		userId,
		greeting,
	};
}
export function updateUserGreetingSuccessAction() {
	return {
		type: UPDATE_USER_GREETING_SUCCESS,
	};
}
export function updateUserGreetingFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_GREETING_FAILED,
		error,
		errorMessage,
	};
}
export function enableUserFundsAction(userId) {
	return {
		type: START_ENABLE_USER_FUNDS,
		userId,
	};
}
export function enableUserFundsSuccessAction() {
	return {
		type: ENABLE_USER_FUNDS_SUCCESS,
	};
}
export function enableUserFundsFailedAction(error, errorMessage) {
	return {
		type: ENABLE_USER_FUNDS_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserPayerAction(userId, payer) {
	return {
		type: START_UPDATE_USER_PAYER,
		userId,
		payer,
	};
}
export function updateUserPayerSuccessAction() {
	return {
		type: UPDATE_USER_PAYER_SUCCESS,
	};
}
export function updateUserPayerFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_PAYER_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserZhuandianAction(userId, isEnableIncentiveZhuandian, isEnableDepositZhuandian) {
	return {
		type: START_UPDATE_USER_ZHUANDIAN,
		userId,
		isEnableIncentiveZhuandian,
		isEnableDepositZhuandian,
	};
}
export function updateUserZhuandianSuccessAction() {
	return {
		type: UPDATE_USER_ZHUANDIAN_SUCCESS,
	};
}
export function updateUserZhuandianFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_ZHUANDIAN_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserTypeAction(userId, userType) {
	return {
		type: START_UPDATE_USER_TYPE,
		userId,
		userType,
	};
}
export function updateUserTypeSuccessAction() {
	return {
		type: UPDATE_USER_TYPE_SUCCESS,
	};
}
export function updateUserTypeFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_TYPE_FAILED,
		error,
		errorMessage,
	};
}

export function enableUserBettingAction(userId) {
	return {
		type: START_ENABLE_USER_BETTING,
		userId,
	};
}
export function enableUserBettingSuccessAction() {
	return {
		type: ENABLE_USER_BETTING_SUCCESS,
	};
}
export function enableUserBettingFailedAction(error, errorMessage) {
	return {
		type: ENABLE_USER_BETTING_FAILED,
		error,
		errorMessage,
	};
}
export function enableUserDividendAction(userId) {
	return {
		type: START_ENABLE_USER_DIVIDEND,
		userId,
	};
}
export function enableUserDividendSuccessAction() {
	return {
		type: ENABLE_USER_DIVIDEND_SUCCESS,
	};
}
export function enableUserDividendFailedAction(error, errorMessage) {
	return {
		type: ENABLE_USER_DIVIDEND_FAILED,
		error,
		errorMessage,
	};
}
export function enableUserWithdrawableAction(userId) {
	return {
		type: START_ENABLE_USER_WITHDRAWABLE,
		userId,
	};
}
export function enableUserWithdrawableSuccessAction() {
	return {
		type: ENABLE_USER_WITHDRAWABLE_SUCCESS,
	};
}
export function enableUserWithdrawableFailedAction(error, errorMessage) {
	return {
		type: ENABLE_USER_WITHDRAWABLE_FAILED,
		error,
		errorMessage,
	};
}
export function disableUserFundsAction(userId) {
	return {
		type: START_DISABLE_USER_FUNDS,
		userId,
	};
}
export function disableUserFundsSuccessAction() {
	return {
		type: DISABLE_USER_FUNDS_SUCCESS,
	};
}
export function disableUserFundsFailedAction(error, errorMessage) {
	return {
		type: DISABLE_USER_FUNDS_FAILED,
		error,
		errorMessage,
	};
}
export function disbleUserDividendAction(userId) {
	return {
		type: START_DISABLE_USER_DIVIDEND,
		userId,
	};
}
export function disbleUserDividendSuccessAction() {
	return {
		type: DISABLE_USER_DIVIDEND_SUCCESS,
	};
}
export function disbleUserDividendFailedAction(error, errorMessage) {
	return {
		type: DISABLE_USER_DIVIDEND_FAILED,
		error,
		errorMessage,
	};
}
export function enableUserDepositAction(userId) {
	return {
		type: START_ENABLE_USER_DEPOSIT,
		userId,
	};
}
export function enableUserDepositSuccessAction() {
	return {
		type: ENABLE_USER_DEPOSIT_SUCCESS,
	};
}
export function enableUserDepositFailedAction(error, errorMessage) {
	return {
		type: ENABLE_USER_DEPOSIT_FAILED,
		error,
		errorMessage,
	};
}

export function enableUserTransferAction(userId) {
	return {
		type: START_ENABLE_USER_TRANSFER,
		userId,
	};
}
export function enableUserTransferSuccessAction() {
	return {
		type: ENABLE_USER_TRANSFER_SUCCESS,
	};
}
export function enableUserTransferFailedAction(error, errorMessage) {
	return {
		type: ENABLE_USER_TRANSFER_FAILED,
		error,
		errorMessage,
	};
}

export function disableUserBettingAction(userId) {
	return {
		type: START_DISABLE_USER_BETTING,
		userId,
	};
}
export function disableUserBettingSuccessAction() {
	return {
		type: DISABLE_USER_BETTING_SUCCESS,
	};
}
export function disableUserBettingFailedAction(error, errorMessage) {
	return {
		type: DISABLE_USER_BETTING_FAILED,
		error,
		errorMessage,
	};
}
export function disableUserWithdrawableAction(userId) {
	return {
		type: START_DISABLE_USER_WITHDRAWABLE,
		userId,
	};
}
export function disableUserWithdrawableSuccessAction() {
	return {
		type: DISABLE_USER_WITHDRAWABLE_SUCCESS,
	};
}
export function disableUserWithdrawableFailedAction(error, errorMessage) {
	return {
		type: DISABLE_USER_WITHDRAWABLE_FAILED,
		error,
		errorMessage,
	};
}
export function disableUserAction(userId) {
	return {
		type: START_DISABLE_USER,
		userId,
	};
}
export function disableUserSuccessAction() {
	return {
		type: DISABLE_USER_SUCCESS
	};
}
export function disableUserFailedAction(error, errorMessage) {
	return {
		type: DISABLE_USER_FAILED,
		error,
		errorMessage,
	};
}
export function disableUserTransferAction(userId) {
	return {
		type: START_DISABLE_USER_TRANSFER,
		userId,
	};
}
export function disableUserTransferSuccessAction() {
	return {
		type: DISABLE_USER_TRANSFER_SUCCESS,
	};
}
export function disableUserTransferFailedAction(error, errorMessage) {
	return {
		type: DISABLE_USER_TRANSFER_FAILED,
		error,
		errorMessage,
	};
}
export function disableUserDepositAction(userId) {
	return {
		type: START_DISABLE_USER_DEPOSIT,
		userId,
	};
}
export function disableUserDepositSuccessAction() {
	return {
		type: DISABLE_USER_DEPOSIT_SUCCESS,
	};
}
export function disableUserDepositFailedAction(error, errorMessage) {
	return {
		type: DISABLE_USER_DEPOSIT_FAILED,
		error,
		errorMessage,
	};
}

export function updateUserBonusAction(userId, bonus) {
	return {
		type: START_UPDATE_USER_BONUS,
		userId,
		bonus,
	};
}
export function updateUserBonusSuccessAction() {
	return {
		type: UPDATE_USER_BONUS_SUCCESS,
	};
}
export function updateUserBonusFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_BONUS_FAILED,
		error,
		errorMessage,
	};
}


export function updateUserFixedWageAction(userId, fixedWage) {
	return {
		type: START_UPDATE_USER_FIXED_WAGE,
		userId,
		fixedWage,
	};
}
export function updateUserFixedWageSuccessAction() {
	return {
		type: UPDATE_USER_FIXED_WAGE_SUCCESS,
	};
}
export function updateUserFixedWageFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_FIXED_WAGE_FAILED,
		error,
		errorMessage,
	};
}

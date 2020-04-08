const {
	ENUM_TRANSACTION_TYPE,
} = require("../enum");
const {
	BETTING,
	TRACE,
	CANCEL_BETTING,
	BETTING_REWARD,
	BETTING_REBATE,
	SELF_FIXED_WAGE,
	TEAM_REBATE,
	TEAM_FIXED_WAGE,
	DEPOSIT,
	WITHDRAWAL,
	ACTIVITY,
	DIVIDEND,
	DIVIDEND_TRANSFER_IN,
	DIVIDEND_GRANTED_FROM_SUPERVISION,
	DIVIDEND_GRANTED_FROM_PRIMARY,
	DIVIDEND_RECEIVED,
	INCENTIVE,
} = ENUM_TRANSACTION_TYPE;
const strategies = {
	[BETTING]: doBettingAmountStats,
	[TRACE]: doBettingAmountStats,
	[CANCEL_BETTING]: doCancelBettingStats,
	[BETTING_REWARD]: doBettingRewardStats,
	[BETTING_REBATE]: doRebateAmountStats,
	[SELF_FIXED_WAGE]: doFixedWageAmountStats,
	[TEAM_REBATE]: doRebateAmountStats,
	[TEAM_FIXED_WAGE]: doFixedWageAmountStats,
	[DEPOSIT]: doDepositAmountStats,
	[WITHDRAWAL]: doWithdrawalAmountStats,
	[ACTIVITY]: doActivityAmountStats,
	[DIVIDEND]: doDividendAmountStats,
	[DIVIDEND_TRANSFER_IN]: doDividendAmountStats,
	[DIVIDEND_GRANTED_FROM_SUPERVISION]: doDividendAmountStats,
	[DIVIDEND_GRANTED_FROM_PRIMARY]: doDividendAmountStats,
	[DIVIDEND_RECEIVED]: doDividendAmountStats,
	[INCENTIVE]: doIncentiveAmountStats,
};

function doBettingAmountStats(amount) {
	return { bettingAmount: -amount };
}

function doCancelBettingStats(amount) {
	return { bettingAmount: -amount };
}

function doBettingRewardStats(amount) {
	return { bettingReward: amount };
}

function doRebateAmountStats(amount) {
	return { rebateAmount: amount };
}

function doFixedWageAmountStats(amount) {
	return { fixedWageAmount: amount };
}

function doDepositAmountStats(amount) {
	return { depositAmount: amount };
}

function doWithdrawalAmountStats(amount) {
	return { withdrawalAmount: -amount };
}

function doActivityAmountStats(amount) {
	return { activityAmount: amount };
}

function doDividendAmountStats(amount) {
	return { dividendAmount: amount };
}

function doIncentiveAmountStats(amount) {
	return { incentiveAmount: amount };
}

module.exports = function (transactionLog) {
	const {
		userId, username, walletCode,
		type, amount, createdAt,
	} = transactionLog;
	const stats = strategies[type](amount);

	stats.userId = userId;
	stats.username = username;
	stats.walletCode = walletCode;
	stats.date = createdAt;

	return stats;
};

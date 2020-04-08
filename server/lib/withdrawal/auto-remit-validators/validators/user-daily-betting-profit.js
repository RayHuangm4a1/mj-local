const {
	ForbiddenError,
} = require("ljit-error");
const {
	WITHDRAWAL_MAX_DAILY_BETTING_PROFIT_EXCEED,
} = require("../../../error/code");
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE,
} = require("../../../enum");

module.exports = function validateUserDailyBettingProfit({
	platform,
	userDailyStats,
}) {
	if (!platform.autoRemitPolicy.isEnableDailyMaxBettingProfit) {
		return;
	}

	const profit = userDailyStats.bettingReward - userDailyStats.bettingAmount;
	const autoRemitDailyMaxBettingProfit = platform.autoRemitPolicy.dailyMaxBettingProfit;

	if (profit > autoRemitDailyMaxBettingProfit) {
		throw new ForbiddenError(
			WITHDRAWAL_MAX_DAILY_BETTING_PROFIT_EXCEED.MESSAGE,
			WITHDRAWAL_MAX_DAILY_BETTING_PROFIT_EXCEED.CODE,
			{
				autoRemitRejectType: ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE.DAILY_BETTING_PROFIT_TOO_MUCH,
				autoRemitDailyMaxBettingProfit,
			}
		);
	}
};

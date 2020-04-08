const {
	ForbiddenError,
} = require("ljit-error");
const {
	WITHDRAWAL_MAX_30DAYS_BETTING_PROFIT_EXCEED,
} = require("../../../error/code");
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE,
} = require("../../../enum");

module.exports = function validateUser30DaysBettingProfit({
	platform,
	sumOfUserDailyStats,
}) {
	if (!platform.autoRemitPolicy.isEnable30DaysMaxBettingProfit) {
		return;
	}

	const profit = sumOfUserDailyStats.bettingReward - sumOfUserDailyStats.bettingAmount;
	const autoRemit30DaysMaxBettingProfit = platform.autoRemitPolicy.thirtyDaysMaxBettingProfit;

	if (profit > autoRemit30DaysMaxBettingProfit) {
		throw new ForbiddenError(
			WITHDRAWAL_MAX_30DAYS_BETTING_PROFIT_EXCEED.MESSAGE,
			WITHDRAWAL_MAX_30DAYS_BETTING_PROFIT_EXCEED.CODE,
			{
				autoRemitRejectType: ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE.THIRTY_DAYS_BETTING_PROFIT_TOO_MUCH,
				autoRemit30DaysMaxBettingProfit,
			}
		);
	}
};

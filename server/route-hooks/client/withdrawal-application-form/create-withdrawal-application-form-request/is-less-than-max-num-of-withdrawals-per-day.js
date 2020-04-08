const {
	ForbiddenError,
} = require("ljit-error");
const {
	EXCEEDED_MAX_NUM_OF_WITHDRAWALS_PER_DAY,
} = require("../../../../lib/error/code");

module.exports = function isLessThanMaxNumOfWithdrawalsPerDay(req, res, next) {
	const { userWithdrawalPolicy, userDailyStatses } = res.locals.user;
	const [userDailyStats] = userDailyStatses;
	let { numOfWithdrawalsPerDay: maxNumOfWithdrawalsPerDay } = res.locals.platform.withdrawalPolicy;

	if (userWithdrawalPolicy !== null) {
		maxNumOfWithdrawalsPerDay = userWithdrawalPolicy.numOfWithdrawalsPerDay;
	}

	if (userDailyStats.numOfWithdrawals >= maxNumOfWithdrawalsPerDay) {
		return next(new ForbiddenError(
			EXCEEDED_MAX_NUM_OF_WITHDRAWALS_PER_DAY.MESSAGE,
			EXCEEDED_MAX_NUM_OF_WITHDRAWALS_PER_DAY.CODE
		));
	}

	next();
};

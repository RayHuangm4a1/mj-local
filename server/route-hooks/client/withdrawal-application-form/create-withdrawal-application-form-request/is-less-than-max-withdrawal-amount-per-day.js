const Decimal = require("decimal.js");
const {
	ForbiddenError,
} = require("ljit-error");
const {
	EXCEEDED_MAX_WITHDRAWAL_AMOUNT_PER_DAY,
} = require("../../../../lib/error/code");

module.exports = function isLessThanMaxWithdrawalAmountPerDay(req, res, next) {
	const { amount } = req.body;
	const { userWithdrawalPolicy, userDailyStatses } = res.locals.user;
	const [userDailyStats] = userDailyStatses;

	let { maxWithdrawalAmountPerDay } = res.locals.platform.withdrawalPolicy;

	if (userWithdrawalPolicy !== null) {
		maxWithdrawalAmountPerDay = userWithdrawalPolicy.maxWithdrawalAmountPerDay;
	}

	try {
		const totalWithdrawalAmount = new Decimal(userDailyStats.withdrawalAmount).add(amount);

		if (totalWithdrawalAmount.gt(maxWithdrawalAmountPerDay)) {
			throw new ForbiddenError(
				EXCEEDED_MAX_WITHDRAWAL_AMOUNT_PER_DAY.MESSAGE,
				EXCEEDED_MAX_WITHDRAWAL_AMOUNT_PER_DAY.CODE
			);
		}
	} catch (error) {
		return next(error);
	}

	next();
};

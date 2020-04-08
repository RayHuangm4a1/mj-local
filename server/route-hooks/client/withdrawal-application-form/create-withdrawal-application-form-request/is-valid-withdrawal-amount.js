const {
	ForbiddenError,
} = require("ljit-error");
const {
	WITHDRAWAL_AMOUNT_LESS_THAN_MIN_AMOUNT,
	WITHDRAWAL_AMOUNT_GREATER_THAN_MAX_AMOUNT,
} = require("../../../../lib/error/code");

module.exports = function isValidWithdrawalAmount(req, res, next) {
	const { amount } = req.body;
	const { userWithdrawalPolicy } = res.locals.user;

	let { minAmountPerWithdrawal, maxAmountPerWithdrawal } = res.locals.platform.withdrawalPolicy;

	if (userWithdrawalPolicy !== null) {
		minAmountPerWithdrawal = userWithdrawalPolicy.minAmountPerWithdrawal;
		maxAmountPerWithdrawal = userWithdrawalPolicy.maxAmountPerWithdrawal;
	}

	if (amount < minAmountPerWithdrawal) {
		const message = WITHDRAWAL_AMOUNT_LESS_THAN_MIN_AMOUNT.MESSAGE.replace(/{AMOUNT}/, minAmountPerWithdrawal);

		return next(new ForbiddenError(
			message,
			WITHDRAWAL_AMOUNT_LESS_THAN_MIN_AMOUNT.CODE
		));
	}

	if (amount > maxAmountPerWithdrawal) {
		const message = WITHDRAWAL_AMOUNT_GREATER_THAN_MAX_AMOUNT.MESSAGE.replace(/{AMOUNT}/, maxAmountPerWithdrawal);

		return next(new ForbiddenError(
			message,
			WITHDRAWAL_AMOUNT_GREATER_THAN_MAX_AMOUNT.CODE
		));
	}

	next();
};

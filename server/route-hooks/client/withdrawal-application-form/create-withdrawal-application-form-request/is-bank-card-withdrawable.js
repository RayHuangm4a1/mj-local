const {
	ForbiddenError,
	NotFoundError,
} = require("ljit-error");
const {
	BANK_CARD_NOT_FOUND,
	BANK_CARD_IS_NOT_WITHDRAWABLE,
} = require("../../../../lib/error/code");

module.exports = function isBankCardWithdrawable(req, res, next) {
	const [bankCard] = res.locals.user.bankCards;

	try {
		if (bankCard === undefined) {
			throw new NotFoundError(BANK_CARD_NOT_FOUND.MESSAGE, BANK_CARD_NOT_FOUND.CODE);
		}

		const isBankCardWithdrawable = new Date(bankCard.userBankCard.withdrawableAt) <= new Date();

		if (!isBankCardWithdrawable) {
			throw new ForbiddenError(BANK_CARD_IS_NOT_WITHDRAWABLE.MESSAGE, BANK_CARD_IS_NOT_WITHDRAWABLE.CODE);
		}
	} catch (error) {
		return next(error);
	}

	next();
};

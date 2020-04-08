const {
	NotFoundError,
	ForbiddenError,
} = require("ljit-error");
const {
	USER_NOT_FOUND,
	BANK_CARD_ALREADY_BOUND,
} = require("../../../../lib/error/code");
const {
	getUserWithActiveBankCardByIdAndBankCardNumber,
} = require('../../../../services/user.admin');

module.exports = async function isBankCardAlreadyBound(req, res, next) {
	try {
		const { userId } = req.params;
		const { number } = req.body;
		const user = await getUserWithActiveBankCardByIdAndBankCardNumber(userId, number);

		if (user === null) {
			throw new NotFoundError(USER_NOT_FOUND.MESSAGE, USER_NOT_FOUND.CODE);
		}

		if (user.bankCards.length) {
			throw new ForbiddenError(BANK_CARD_ALREADY_BOUND.MESSAGE, BANK_CARD_ALREADY_BOUND.CODE);
		}

		res.locals.managedUser = user;
	} catch (error) {
		return next(error);
	}

	next();
};

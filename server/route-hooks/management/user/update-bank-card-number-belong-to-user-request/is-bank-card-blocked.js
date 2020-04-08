const {
	ForbiddenError,
} = require("ljit-error");
const {
	BANK_CARD_IS_BLOCKED,
} = require("../../../../lib/error/code");
const {
	isBankCardBlockedByNumber,
} = require('../../../../services/bank-card.admin');

module.exports = async function isBankCardBlocked(req, res, next) {
	try {
		const { number } = req.body;
		const isBlocked = await isBankCardBlockedByNumber(number);

		if (isBlocked) {
			throw new ForbiddenError(BANK_CARD_IS_BLOCKED.MESSAGE, BANK_CARD_IS_BLOCKED.CODE);
		}
	} catch (error) {
		return next(error);
	}

	next();
};

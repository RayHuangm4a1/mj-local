const {
	ForbiddenError,
} = require('ljit-error');
const {
	BANK_CARD_BANK_NOT_EXIST,
} = require('../../../../lib/error/code');
const {
	getBankByBankCardNumber,
} = require('../../../../services/bank');

module.exports = async function prepareBank(req, res, next) {
	try {
		const bank = await getBankByBankCardNumber(req.body.number);

		if (bank === null) {
			throw new ForbiddenError(BANK_CARD_BANK_NOT_EXIST.MESSAGE, BANK_CARD_BANK_NOT_EXIST.CODE);
		}

		res.locals.bank = bank;
	} catch (error) {
		return next(error);
	}

	next();
};
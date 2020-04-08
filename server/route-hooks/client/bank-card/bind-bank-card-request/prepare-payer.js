const {
	ForbiddenError,
} = require('ljit-error');
const {
	BANK_CARD_INVALID_PAYER,
} = require('../../../../lib/error/code');

module.exports = function preparePayer(req, res, next) {
	if (res.locals.user.payer !== null) {
		res.locals.payer = res.locals.user.payer;

		return next();
	}

	if (req.body.payer === undefined) {
		const error = new ForbiddenError(BANK_CARD_INVALID_PAYER.MESSAGE, BANK_CARD_INVALID_PAYER.CODE);

		return next(error);
	}

	res.locals.payer = req.body.payer;

	next();
};

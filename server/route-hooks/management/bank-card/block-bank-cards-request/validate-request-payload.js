const {
	RequestValidationError,
} = require("ljit-error");
const {
	BANK_CARD_INVALID_REQUEST,
} = require('../../../../lib/error/code');
const {
	ENUM_BANK_CARD_STATUS,
} = require('../../../../lib/enum');

module.exports = function validateRequestPayload(req, res, next) {
	req.sanitizeQuery('status').toInt();

	if (req.query.status !== ENUM_BANK_CARD_STATUS.BLOCKED) {
		return next('route');
	}

	req.checkBody().isArray().notEmpty();
	req.checkBody('*.blockedPayer').optional().isPayer();
	req.checkBody('*.number').isBankCardNumber();
	req.checkBody('*.description').optional().isLength({ min: 1, max: 32 });

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(BANK_CARD_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

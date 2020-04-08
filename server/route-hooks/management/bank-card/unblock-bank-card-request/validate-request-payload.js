const {
	RequestValidationError,
} = require("ljit-error");
const {
	BANK_CARD_INVALID_REQUEST,
} = require('../../../../lib/error/code');

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams('bankCardId').isSQLId();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(BANK_CARD_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

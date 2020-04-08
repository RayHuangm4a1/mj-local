const {
	RequestValidationError,
} = require("ljit-error");
const {
	DEPOSIT_APPLICATION_FORM_INVALID_REQUEST,
} = require('../../../../lib/error/code');

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams('inconsistentDepositApplicationFormId').isSQLId();
	req.checkBody('depositApplicationFormId').isSQLId();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(DEPOSIT_APPLICATION_FORM_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

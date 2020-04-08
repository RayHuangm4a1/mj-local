const {
	RequestValidationError,
} = require("ljit-error");
const {
	ACCOUNT_INVALID_REQUEST,
} = require("mj-service-sdks/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("payer").isPayer();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(ACCOUNT_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

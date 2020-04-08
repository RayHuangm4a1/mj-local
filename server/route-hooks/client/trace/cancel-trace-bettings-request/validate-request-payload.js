const { RequestValidationError } = require("ljit-error");
const {
	TRACE_INVALID_REQUEST,
} = require('../../../../lib/error/code');

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("traceId").isSQLId();
	req.checkBody().isArray().notEmpty();
	req.checkBody("*").isSQLId();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(TRACE_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

const {
	RequestValidationError,
} = require("ljit-error");
const { STAFF_INVALID_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("staffId").isSQLId();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(STAFF_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

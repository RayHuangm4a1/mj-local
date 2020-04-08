const {
	RequestValidationError,
} = require("ljit-error");
const {
	STAFF_INVALID_REQUEST,
} = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkQuery("username").optional().isUsername();
	req.checkQuery("page").optional().isPage();
	req.checkQuery("limit").optional().isLimit();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(STAFF_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

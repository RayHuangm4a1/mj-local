const {
	RequestValidationError,
} = require("ljit-error");
const { USER_INVALID_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("userId").isSQLId();
	req.checkQuery("sort").optional().isIn(["activatedAt", "withdrawableAt"]);
	req.checkQuery("order").optional().isOrder();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

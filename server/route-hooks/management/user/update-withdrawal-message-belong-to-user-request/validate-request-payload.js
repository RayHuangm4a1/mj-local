const {
	RequestValidationError,
} = require("ljit-error");
const {
	USER_INVALID_REQUEST,
} = require("../../../../lib/error/code");

module.exports = function validateRequestPaylaod(req, res, next) {
	req.checkParams("userId").isSQLId();
	req.checkBody("message").isWithdrawalMessage();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

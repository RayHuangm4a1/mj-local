const {
	RequestValidationError,
} = require("ljit-error");
const {
	USER_INVALID_REQUEST,
} = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	if (req.query.via !== "password") {
		return next("route");
	}

	req.checkBody("password").isPassword().optional();
	req.checkBody("newPassword").isPassword();
	req.checkBody("confirmedPassword").equals(req.body.newPassword);

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

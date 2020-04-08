const { RequestValidationError } = require("ljit-error");
const { INVALID_AUTH_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	if (req.query.via !== "google-totp") {
		return next("route");
	}

	req.checkBody("username").isUsername();
	req.checkBody("totp").isTOTP();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(INVALID_AUTH_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

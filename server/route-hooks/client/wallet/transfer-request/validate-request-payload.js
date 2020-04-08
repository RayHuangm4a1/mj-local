const {
	RequestValidationError,
} = require("ljit-error");
const {
	USER_INVALID_REQUEST,
} = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkBody("username").isUsername();
	req.checkBody("bankCardNumber").isInt().isLength({ min: 6, max: 6 });
	req.checkBody("password").isPassword();
	req.checkBody("amount").isAmountPerTransfer();
	req.checkBody("totp").isTOTP();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

const {
	RequestValidationError,
} = require("ljit-error");
const {
	USER_INVALID_REQUEST,
} = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkBody("password").isPassword();
	req.checkBody("data").isLimitLengthArray({ min: 3, max: 3 });
	req.checkBody("data").isUniqueArrayItems("id");
	req.checkBody("data.*.id").isSQLId();
	req.checkBody("data.*.answer").isSecurityQuestionAnswer();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

const {
	RequestValidationError
} = require("ljit-error");
const {
	ACCOUNT_INVALID_REQUEST,
} = require("mj-service-sdks/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	if (req.query.via !== "security-question") {
		return next("route");
	}

	req.checkBody("newPassword").isPassword();
	req.checkBody("confirmedPassword").equals(req.body.newPassword);
	req.checkBody("securityQuestionAnswers").isLimitLengthArray({ min: 2, max: 2 });
	req.checkBody("securityQuestionAnswers").isUniqueArrayItems("id");
	req.checkBody("securityQuestionAnswers.*.id").isSQLId();
	req.checkBody("securityQuestionAnswers.*.answer").isSecurityQuestionAnswer();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(ACCOUNT_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

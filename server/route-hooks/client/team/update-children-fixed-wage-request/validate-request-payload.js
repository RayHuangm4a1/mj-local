const {
	RequestValidationError,
} = require("ljit-error");
const {
	TEAM_INVALID_REQUEST,
} = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkBody("fixedWage").isPercentage();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(TEAM_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

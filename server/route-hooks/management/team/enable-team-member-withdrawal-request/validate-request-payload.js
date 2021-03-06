const { RequestValidationError } = require("ljit-error");
const { TEAM_INVALID_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("memberId").isSQLId();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(TEAM_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.sanitizeParams("leaderId").toInt();

	next();
};

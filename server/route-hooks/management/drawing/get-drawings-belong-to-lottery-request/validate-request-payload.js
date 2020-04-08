const { RequestValidationError } = require("ljit-error");
const { DRAWING_INVALID_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("lotteryId").isSQLId();
	req.checkQuery("issue.lt").isIssue();
	req.checkQuery("limit").optional().isLimit();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(DRAWING_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.sanitizeQuery("issue.lt").toInt();

	next();
};

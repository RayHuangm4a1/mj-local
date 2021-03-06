const { RequestValidationError } = require("ljit-error");
const { DRAWING_INVALID_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("lotteryId").isSQLId();
	req.checkParams("issue").isIssue();
	req.checkQuery("count").isInt({ min: 1, max: 1 });

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(DRAWING_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.sanitizeParams("lotteryId").toInt();
	req.sanitizeParams("issue").toInt();

	next();
};

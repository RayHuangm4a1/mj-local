const { RequestValidationError } = require("ljit-error");
const { PLAY_INVALID_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("lotteryId").isSQLId();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(PLAY_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

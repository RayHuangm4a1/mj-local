const { RequestValidationError } = require("ljit-error");
const { PLAY_CONDITION_INVALID_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("lotteryId").isSQLId();
	req.checkParams("playClassId").isSQLId();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(PLAY_CONDITION_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

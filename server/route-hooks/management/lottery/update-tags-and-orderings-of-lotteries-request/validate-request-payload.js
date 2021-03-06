const { RequestValidationError } = require("ljit-error");
const { LOTTERY_INVALID_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("lotteryClassId").isSQLId();
	req.checkBody().isArray().notEmpty();
	req.checkBody("*.id").isSQLId();
	req.checkBody("*.tags").isTagCodes();
	req.checkBody("*.ordering").isOrdering();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(LOTTERY_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

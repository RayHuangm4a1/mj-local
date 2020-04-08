const { RequestValidationError } = require("ljit-error");
const { DRAWING_INVALID_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	if (req.query.before === undefined && req.query.current === undefined) {
		return next("route");
	}

	req.checkParams("lotteryId").isSQLId();
	req.checkQuery("before").isInt({ min: 1, max: 1 });
	req.checkQuery("current").isInt({ min: 1, max: 1 });

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(DRAWING_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

const {
	RequestValidationError,
} = require("ljit-error");
const { USER_INVALID_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("userId").isSQLId();
	req.checkBody("bonus").isIn(res.locals.platform.bonus.list);

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.sanitizeParams("userId").toInt();

	next();
};

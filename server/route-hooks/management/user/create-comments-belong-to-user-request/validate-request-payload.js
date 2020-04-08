const { RequestValidationError } = require("ljit-error");
const {
	USER_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const {
	ENUM_COMMENT_STATUS,
} = require("../../../../lib/enum");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("userId").isSQLId();
	req.checkBody("status").isIn([
		ENUM_COMMENT_STATUS.DEFAULT,
		ENUM_COMMENT_STATUS.PINNED,
	]);
	req.checkBody("description").isLength({ min: 1, max: 100 });

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.sanitizeParams('userId').toInt();

	next();
};

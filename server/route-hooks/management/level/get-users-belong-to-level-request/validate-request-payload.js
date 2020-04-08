const {
	RequestValidationError,
} = require("ljit-error");
const {
	LEVEL_INVALID_REQUEST,
} = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("levelId").isSQLId();
	req.checkQuery("username").optional().isUsername();
	req.checkQuery("loginAtFrom").optional().isTimestamp();
	req.checkQuery("loginAtTo").optional().isTimestamp();
	req.checkQuery("limit").optional().isLimit();
	req.checkQuery("sort").optional().isIn(["loginAt"]);
	req.checkQuery("order").optional().isOrder();
	req.checkQuery("page").optional().isPage();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(LEVEL_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.sanitizeQuery('loginAtFrom').toInt();
	req.sanitizeQuery('loginAtTo').toInt();

	next();
};

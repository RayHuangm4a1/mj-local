const {
	ENUM_USER_LEVEL_LOG_STATUS,
} = require("../../../../lib/enum");
const {
	RequestValidationError,
} = require("ljit-error");
const {
	USER_LEVEL_LOG_INVALID_REQUEST,
} = require('../../../../lib/error/code');

module.exports = function validateRequestPayload(req, res, next) {
	req.sanitizeQuery("status").toNumberArray();

	req.checkQuery("status.*").isIn(Object.values(ENUM_USER_LEVEL_LOG_STATUS));
	req.checkQuery("username").optional().isUsername();
	req.checkQuery("afterLevelId").optional().isSQLId();
	req.checkQuery("previousLevelId").optional().isSQLId();
	req.checkQuery("limit").optional().isLimit();
	req.checkQuery("page").optional().isPage();
	req.checkQuery("from").optional().isTimestamp();
	req.checkQuery("to").optional().isTimestamp();
	req.checkQuery("sort").optional().isIn(["createdAt"]);
	req.checkQuery("order").optional().isOrder();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_LEVEL_LOG_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.sanitizeQuery('from').toInt();
	req.sanitizeQuery('to').toInt();

	next();
};

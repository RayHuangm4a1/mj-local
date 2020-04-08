const {
	RequestValidationError,
} = require("ljit-error");
const {
	USER_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const {
	getDateBeforeNDays,
} = require("../../../../lib/date");

module.exports = function validateRequestPayload(req, res, next) {
	const earliestQueriedDate = getDateBeforeNDays(45);

	req.checkQuery("from").optional().after(earliestQueriedDate);
	req.checkQuery("to").optional().isTimestamp();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

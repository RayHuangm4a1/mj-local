const {
	ENUM_TRACE_STATUS,
} = require("../../../../lib/enum");
const {
	getDateBeforeNDays,
} = require("../../../../lib/date");
const {
	TRACE_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const {
	RequestValidationError,
} = require("ljit-error");

module.exports = function validateRequestPayload(req, res, next) {
	const earliestQueriedDate = getDateBeforeNDays(45);

	req.checkQuery("lotteryId").isSQLId();
	req.checkQuery("username").optional().isUsername();
	req.checkQuery("id").optional().isSQLId();
	req.checkQuery("issue").optional().isIssue();
	req.checkQuery("status").optional().isIn(Object.values(ENUM_TRACE_STATUS));
	req.checkQuery("playId").optional().isSQLId();
	req.checkQuery("from").optional().after(earliestQueriedDate);
	req.checkQuery("to").optional().isTimestamp();
	req.checkQuery("limit").optional().isLimit();
	req.checkQuery("page").optional().isPage();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(TRACE_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.sanitizeQuery('status').toInt();
	req.sanitizeQuery('id').toInt();

	next();
};

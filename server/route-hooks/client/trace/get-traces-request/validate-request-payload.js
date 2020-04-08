const { RequestValidationError } = require("ljit-error");
const {
	BETTING_INVALID_REQUEST,
} = require('../../../../lib/error/code');
const {
	getDateBeforeNDays,
} = require("../../../../lib/date");
const {
	ENUM_TRACE_STATUS,
} = require("../../../../lib/enum");

module.exports = function validateGetTracesRequest(req, res, next) {
	const earliestQueriedDate = getDateBeforeNDays(45);

	req.checkQuery("id").optional().isSQLId();
	req.checkQuery("lotteryId").optional().isSQLId();
	req.checkQuery("from").optional().after(earliestQueriedDate);
	req.checkQuery("to").optional().isTimestamp();
	req.checkQuery("page").optional().isPage();
	req.checkQuery("limit").optional().isLimit();
	req.checkQuery("sort").optional().isIn(["createdAt", "amount"]);
	req.checkQuery("order").optional().isOrder();
	req.checkQuery("status").optional().isIn([
		ENUM_TRACE_STATUS.NEW,
		ENUM_TRACE_STATUS.DONE,
	]);

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(BETTING_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

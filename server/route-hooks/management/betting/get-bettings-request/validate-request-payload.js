const {
	ENUM_BETTING_STATUS,
	ENUM_BETTING_TYPE,
} = require("../../../../lib/enum");
const {
	getDateBeforeNDays,
} = require("../../../../lib/date");
const {
	RequestValidationError,
} = require("ljit-error");
const {
	BETTING_INVALID_REQUEST,
} = require('../../../../lib/error/code');

module.exports = function validateRequestPayload(req, res, next) {
	const earliestQueriedDate = getDateBeforeNDays(45);

	req.checkQuery("lotteryId").isSQLId();
	req.checkQuery("from").optional().after(earliestQueriedDate);
	req.checkQuery("to").optional().isTimestamp();
	req.checkQuery("id").optional().isSQLId();
	req.checkQuery("playId").optional().isSQLId();
	req.checkQuery("ip").optional().isIP();
	req.checkQuery("username").optional().isUsername();
	req.checkQuery("issue").optional().isIssue();
	req.checkQuery("status").optional().isIn(Object.values(ENUM_BETTING_STATUS));
	req.checkQuery("page").optional().isPage();
	req.checkQuery("limit").optional().isLimit();
	req.checkQuery("sort").optional().isIn(["reward", "createdAt"]);
	req.checkQuery("order").optional().isOrder();
	req.checkQuery("type").optional().isIn(Object.values(ENUM_BETTING_TYPE));
	req.checkQuery("traceId").optional().isSQLId();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(BETTING_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

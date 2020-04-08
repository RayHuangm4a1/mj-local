const {
	RequestValidationError,
} = require("ljit-error");
const {
	USER_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const {
	ENUM_DIVIDEND_STATUS,
} = require("../../../../lib/enum");

module.exports = function validateRequestPayload(req, res, next) {
	if (req.query.dividends !== "1") {
		return next("route");
	}

	req.checkQuery("username").optional().isUsername();
	req.checkQuery("durationId").optional().isSQLId();
	req.checkQuery("status").optional().isIn(Object.values(ENUM_DIVIDEND_STATUS));
	req.checkQuery("sort").optional().isIn([
		"deltaBonus",
		"numOfUsers",
		"balance",
		"teamBalance",
		"bettingAmount",
		"maxGrantAmount",
		"grantedAmount",
		"profit",
	]);
	req.checkQuery("order").optional().isOrder();
	req.checkQuery("page").optional().isPage();
	req.checkQuery("limit").optional().isLimit();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

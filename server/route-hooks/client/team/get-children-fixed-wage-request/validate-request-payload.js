const {
	RequestValidationError,
} = require("ljit-error");
const {
	USER_INVALID_REQUEST,
} = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	if (req.query.fixedWage !== "1") {
		return next("route");
	}

	req.checkQuery("username").optional().isUsername();
	req.checkQuery("sort").optional().isIn([
		"deltaBonus",
		"balance",
		"teamBalance",
		"fixedWage",
		"numOfUsers",
		"createdAt"
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

const {
	RequestValidationError,
} = require("ljit-error");
const {
	isUsername,
	isSQLId,
} = require("ljit-validation").validators;
const {
	TEAM_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const {
	getDateBeforeNDays,
} = require("../../../../lib/date");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("userIdOrUsername").oneOf([isSQLId, isUsername]);
	req.checkQuery("from").isTimestamp().after(getDateBeforeNDays(45)).optional();
	req.checkQuery("to").isTimestamp().optional();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(TEAM_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

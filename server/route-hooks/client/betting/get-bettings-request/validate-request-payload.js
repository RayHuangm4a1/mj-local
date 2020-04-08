const Joi = require("joi");
const { RequestValidationError } = require("ljit-error");
const { BETTING_INVALID_REQUEST } = require('../../../../lib/error/code');
const { ENUM_BETTING_STATUS } = require('../../../../lib/enum');

const SEARCH_BETTINGS_VALIDATION_SCHEMA = Joi.object({
	id: Joi.number().integer().optional(),
	issue: Joi.number().integer().optional(),
	lotteryId: Joi.number().integer().optional(),
	status: Joi.number().integer().valid(Object.values(ENUM_BETTING_STATUS)).optional(),
	from: Joi.date().timestamp().optional(),
	to: Joi.date().timestamp().optional(),
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(10).optional(),
	sort: Joi.string().valid(["createdAt", "amount", "reward", "status"]).optional(),
	order: Joi.string().valid(["asc", "desc"]).optional(),
}).oxor("id", "issue");

module.exports = function validateRequestPayload(req, res, next) {
	let { error } = Joi.validate(req.query, SEARCH_BETTINGS_VALIDATION_SCHEMA);

	if (error !== null) {
		error = new RequestValidationError(
			BETTING_INVALID_REQUEST.CODE,
			error,
			error.details[0].message
		);

		return next(error);
	}

	req.sanitizeQuery('status').toInt();

	next();
};

const Joi = require("joi");
const {
	RequestValidationError,
} = require("ljit-error");
const {
	TRANSACTION_LOG_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const {
	TRANSACTION_LOG_TYPES,
} = require("../../../transaction-log");

Joi.objectId = require("joi-objectid")(Joi);

const SEARCH_TRANSACTION_LOGS_VALIDATION_SCHEMA = Joi.object({
	id: Joi.number().integer().min(0).optional(),
	type: Joi.number().integer().valid(TRANSACTION_LOG_TYPES).optional(),
	from: Joi.date().timestamp().optional(),
	to: Joi.date().timestamp().optional(),
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(10).optional(),
	sort: Joi.string().valid(["createdAt"]).optional(),
	order: Joi.string().valid(["asc", "desc"]).optional(),
	dividend: Joi.number().valid([0]).required(),
});

module.exports = function validateGetTransactionLogsRequest(req, res, next) {
	if (req.query.dividend !== '0') {
		return next('route');
	}

	let { error } = Joi.validate(req.query, SEARCH_TRANSACTION_LOGS_VALIDATION_SCHEMA);

	if (error !== null) {
		error = new RequestValidationError(TRANSACTION_LOG_INVALID_REQUEST.CODE, error);

		return next(error);
	}

	next();
};

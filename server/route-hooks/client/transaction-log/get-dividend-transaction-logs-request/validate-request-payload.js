const Joi = require("joi");
const {
	RequestValidationError,
} = require("ljit-error");
const {
	TRANSACTION_LOG_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const {
	ENUM_TRANSACTION_TYPE: {
		DIVIDEND_TRANSFER_OUT,
		DIVIDEND_GRANTED_FROM_SUPERVISION,
		DIVIDEND_RECEIVED,
	},
} = require('../../../../lib/enum');

Joi.objectId = require("joi-objectid")(Joi);

const SEARCH_DIVIDEND_TRANSACTION_LOGS_VALIDATION_SCHEMA = Joi.object({
	id: Joi.number().integer().min(0).optional(),
	type: Joi.string().valid([
		`${DIVIDEND_TRANSFER_OUT},${DIVIDEND_GRANTED_FROM_SUPERVISION}`,
		`${DIVIDEND_RECEIVED}`
	]).optional(),
	from: Joi.date().timestamp().optional(),
	to: Joi.date().timestamp().optional(),
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(10).optional(),
	sort: Joi.string().valid(["createdAt"]).optional(),
	order: Joi.string().valid(["asc", "desc"]).optional(),
	dividend: Joi.number().valid([1]).required(),
});

module.exports = function validateGetDividendTransactionLogsRequest(req, res, next) {
	const { dividend } = req.query;

	if (dividend !== '1') {
		return next('route');
	}

	let { error } = Joi.validate(req.query, SEARCH_DIVIDEND_TRANSACTION_LOGS_VALIDATION_SCHEMA);

	if (error !== null) {
		error = new RequestValidationError(TRANSACTION_LOG_INVALID_REQUEST.CODE, error);

		return next(error);
	}

	next();
};

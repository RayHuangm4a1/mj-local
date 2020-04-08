const Joi = require("joi");
const {
	RequestValidationError,
} = require("ljit-error");
const {
	ENUM_FINANCIAL_LEVEL_ID,
	ENUM_FINANCIAL_DEPARTMENT_ID,
	ENUM_DEPOSIT_APPLICATION_FORM_STATUS,
} = require('../../../../lib/enum');
const {
	DEPOSIT_APPLICATION_FORM_INVALID_REQUEST,
} = require('../../../../lib/error/code');

const GET_DEPOSIT_APPLICATION_FORM_PARAMS_VALIDATION_SCHEMA = Joi.object({
	departmentId: Joi.number().valid(Object.values(ENUM_FINANCIAL_DEPARTMENT_ID)).required(),
	depositClassId: Joi.number().integer().positive().required(),
});
const GET_DEPOSIT_APPLICATION_FORM_QUERY_VALIDATION_SCHEMA = Joi.object({
	createdAtFrom: Joi.date().timestamp().optional(),
	createdAtTo: Joi.date().timestamp().optional(),
	confirmedAtFrom: Joi.date().timestamp().optional(),
	confirmedAtTo: Joi.date().timestamp().optional(),
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(10).optional(),
	sort: Joi.string().valid(["amount", "fee", "createdAt", "confirmedAt"]).optional(),
	order: Joi.string().valid(["asc", "desc"]).optional(),
	username: Joi.string().optional(),
	levelId: Joi.number().valid(Object.values(ENUM_FINANCIAL_LEVEL_ID)).optional(),
	id: Joi.number().integer().positive().optional(),
	bankId: Joi.number().integer().positive().optional(),
	payer: Joi.string().optional(),
	amount: Joi.number().positive().optional(),
	status: Joi.array().items(Joi.valid(Object.values(ENUM_DEPOSIT_APPLICATION_FORM_STATUS))).optional(),
});

module.exports = function validateRequestPayload(req, res, next) {
	req.sanitizeQuery('status').toNumberArray();

	const { error } = Joi.validate({
		params: req.params,
		query: req.query,
	}, {
		params: GET_DEPOSIT_APPLICATION_FORM_PARAMS_VALIDATION_SCHEMA,
		query: GET_DEPOSIT_APPLICATION_FORM_QUERY_VALIDATION_SCHEMA,
	});

	if (error !== null) {
		const err = new RequestValidationError(
			DEPOSIT_APPLICATION_FORM_INVALID_REQUEST.CODE,
			error,
			error.details[0].message
		);

		return next(err);
	}

	req.sanitizeQuery('confirmedAtFrom').toInt();
	req.sanitizeQuery('confirmedAtTo').toInt();

	next();
};

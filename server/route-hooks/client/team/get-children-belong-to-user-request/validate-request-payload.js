const Joi = require("joi");
const {
	RequestValidationError,
} = require("ljit-error");
const {
	USER_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const {
	isUsername,
	isSQLId,
} = require("ljit-validation").validators;
const SEARCH_CHILDREN_VALIDATION_SCHEMA = Joi.object().keys({
	deltaBonus: Joi.number().integer().optional(),
	minBalance: Joi.number().min(0).optional(),
	maxBalance: Joi.number().optional(),
	sort: Joi.string().valid([
		"deltaBonus",
		"balance",
		"teamBalance",
		"loginAt",
		"numOfUsers",
		"createdAt"
	]).optional(),
	order: Joi.string().valid(["asc", "desc"]).optional(),
	page: Joi.number().integer().min(1).optional(),
}).required();

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("userIdOrUsername").oneOf([isSQLId, isUsername]);

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	const { error: queryStringError } = Joi.validate(req.query, SEARCH_CHILDREN_VALIDATION_SCHEMA);

	if (queryStringError !== null) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, queryStringError);

		return next(error);
	}

	next();
};

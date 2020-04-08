const Joi = require("joi");
const { RequestValidationError } = require("ljit-error");
const { PLAY_INVALID_REQUEST } = require("../../../../lib/error/code");
const idSchema = Joi.number().integer().positive().required();
const awardSchema = Joi.string().required();
const bonusSchema = Joi.number().integer().required();
const isPKEnabledSchema = Joi.boolean().strict().required();
const countSchema = Joi.number().integer().allow(0).positive().required();

module.exports = function validateRequestPayload(req, res, next) {
	const querySringSchema = Joi.array().min(2).max(2).items(
		Joi.string().valid("deltaBonus", "pk").required(),
	).required();

	const { error: queryStringError } = Joi.validate(req.query.fields, querySringSchema);

	if (queryStringError !== null) {
		return next("route");
	}

	const bodySchema = Joi.array().items(
		Joi.alternatives().try(
			Joi.object({
				id: idSchema,
				award: awardSchema,
				bonus: bonusSchema,
				isPKEnabled: isPKEnabledSchema,
				count: countSchema,
			}),
			Joi.object({
				id: idSchema,
				award: awardSchema,
				bonus: bonusSchema,
			}),
			Joi.object({
				id: idSchema,
				award: awardSchema,
				isPKEnabled: isPKEnabledSchema,
				count: countSchema,
			}),
		),
	).required();

	const { error: bodyError } = Joi.validate(req.body, bodySchema, { allowUnknown: false });

	if (bodyError !== null) {
		const error = new RequestValidationError(
			PLAY_INVALID_REQUEST.CODE,
			bodyError,
			bodyError.details[0].message
		);

		return next(error);
	}

	req.checkParams("lotteryId").isSQLId();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(PLAY_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

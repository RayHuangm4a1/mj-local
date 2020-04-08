const Joi = require("joi");
const { RequestValidationError } = require("ljit-error");
const { PLAY_INVALID_REQUEST } = require("../../../../lib/error/code");

module.exports = function validateRequestPayload(req, res, next) {
	const schema = Joi.array().min(1).max(1).items(
		Joi.string().valid("status").required(),
	).required();

	const { error } = Joi.validate(req.query.fields, schema);

	if (error !== null) {
		return next("route");
	}

	req.checkParams("lotteryId").isSQLId();
	req.checkBody("*.id").isSQLId();
	req.checkBody("*.status").isPlayStatus();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(PLAY_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

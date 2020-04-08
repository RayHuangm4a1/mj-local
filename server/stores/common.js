const Joi = require("joi");

function isPartitionPrimaryKeyExisted(rows) {
	const schema = Joi.array().items(Joi.object({
		id: Joi.number().integer().required(),
		createdAt: Joi.date().required(),
	}));

	const { error } = Joi.validate(rows, schema, { allowUnknown: true });

	return error === null;
}

function isPrimaryKeyExisted(rows) {
	const schema = Joi.array().items(Joi.object({
		id: Joi.number().integer().required(),
	}));

	const { error } = Joi.validate(rows, schema, { allowUnknown: true });

	return error === null;
}

module.exports = {
	isPartitionPrimaryKeyExisted,
	isPrimaryKeyExisted,
};

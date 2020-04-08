const Joi = require("joi");
const {
	getTransaction,
	insertMany,
} = require("../models/team-bonus-stats");

function isUniqueKeyExisted(rows) {
	const schema = Joi.array().items(Joi.object({
		userId: Joi.number().integer().required(),
		deltaBonus: Joi.number().integer().required(),
	}));

	const { error } = Joi.validate(rows, schema, { allowUnknown: true });

	return error === null;
}

function bulkIncreaseTeamBonusStatses(rows, {
	transaction,
} = {}) {
	if (!isUniqueKeyExisted(rows)) {
		throw new Error("userId & deltaBonus missing.");
	}

	return insertMany(rows, {
		updateOnDuplicate: ["updatedAt"],
		incrementOnDuplicate: [ "numOfUsers" ],
		ignoreDuplicates: true,
		transaction,
	});
}

module.exports = {
	getTransaction,
	bulkIncreaseTeamBonusStatses,
};

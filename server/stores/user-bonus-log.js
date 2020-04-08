const {
	findOne,
	insertMany,
	destroy,
} = require("../models/user-bonus-log");

function createUserBonusLogs(rows, {
	transaction,
} = {}) {
	return insertMany(rows, { transaction });
}

function getEarliestUserBonusLog({
	projections,
} = {}) {
	return findOne({
		order: [
			[ "createdAt", "ASC" ],
			[ "id", "ASC" ],
		],
		attributes: projections,
	});
}

function deleteUserBonusLogById(id, {
	transaction,
} = {}) {
	return destroy({
		where: {
			id,
		},
		transaction,
	});
}

module.exports = {
	createUserBonusLogs,
	getEarliestUserBonusLog,
	deleteUserBonusLogById,
};

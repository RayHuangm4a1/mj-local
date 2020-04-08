const {
	increment,
	find,
	findOne,
	update,
} = require("../models/level");
const {
	ENUM_FINANCIAL_LEVEL_STATUS,
} = require('../lib/enum');

const ID_ONLY_PROJECTIONS = [
	"id",
];
const NUM_OF_USERS_ONLY_PROJECTIONS = [
	"numOfUsers",
];

function increaseNumOfUsersById(id, {
	transaction,
} = {}) {
	return increment({
		numOfUsers: 1,
	}, {
		where: {
			id,
		},
		transaction,
	});
}

function decreaseNumOfUsersById(id, {
	transaction,
} = {}) {
	return increment({
		numOfUsers: -1,
	}, {
		where: {
			id,
		},
		transaction,
	});
}

function getLevels({ projections } = {}) {
	return find({
		order:[
			["id", "asc"]
		],
		attributes: projections,
	});
}

function getLevelById(id, {
	projections,
} = {}) {
	return findOne({
		where: {
			id,
		},
		attributes: projections,
	});
}

function getActiveLevelById(id, {
	projections,
} = {}) {
	return findOne({
		where: {
			id,
			status: ENUM_FINANCIAL_LEVEL_STATUS.ACTIVE,
		},
		attributes: projections,
	});
}

function updateLevelById(id, row) {
	return update(row, {
		where: {
			id,
		},
	});
}

function updateLevelIfWithoutUsersById(id, row) {
	return update(row, {
		where: {
			id,
			numOfUsers: 0,
		},
	});
}

module.exports = {
	increaseNumOfUsersById,
	decreaseNumOfUsersById,

	getLevels,
	getLevelById,
	getActiveLevelById,
	updateLevelById,
	updateLevelIfWithoutUsersById,

	ID_ONLY_PROJECTIONS,
	NUM_OF_USERS_ONLY_PROJECTIONS,
};

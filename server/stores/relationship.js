const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
	find,
	findOne,
	insertMany,
} = require("../models/relationship");
const MIN_PROJECTIONS = [
	"id",
	"userId",
	"username",
	"ancestorId",
	"ancestorUsername",
	"distance",
];
const ANCESTOR_PROJECTIONS = [
	["ancestorId", "id"],
	["ancestorUsername", "username"],
];
const DISTANCE_ONLY_PROJECTIONS = [
	"distance",
];
const USERID_ONLY_PROJECTIONS = [
	"userId",
];
const ANCESTORID_ONLY_PROJECTIONS = [
	["ancestorId", "id"],
];
const {
	ENUM_RELATIONSHIP_DISTANCE,
} = require("../lib/enum");

function getChildrenAndMeRelationshipsByUserId(ancestorId, {
	projections,
} = {}) {
	return find({
		where: {
			ancestorId,
			distance: {
				[Op.in]: [ENUM_RELATIONSHIP_DISTANCE.ME, ENUM_RELATIONSHIP_DISTANCE.CHILDREN],
			},
		},
		attributes: projections,
	});
}

function getChildrenRelationshipsByUserId(ancestorId, {
	projections,
} = {}) {
	return find({
		where: {
			ancestorId,
			distance: ENUM_RELATIONSHIP_DISTANCE.CHILDREN,
		},
		attributes: projections,
	});
}

async function getAncestorAndMeRelationshipsByAncestorIdAndUserId(ancestorId, userId, {
	projections,
} = {}) {
	const distance = await getDistanceByAncestorIdAndUserId(ancestorId, userId);

	if (distance === null) {
		return [];
	}

	return find({
		where: {
			userId,
			distance: {
				[Op.lte]: distance,
			},
		},
		order: [[ "distance", "desc" ]],
		attributes: projections,
	});
}

async function getDistanceByAncestorIdAndUserId(ancestorId, userId) {
	const relationship = await findOne({
		where: {
			userId,
			ancestorId,
		},
		attributes: DISTANCE_ONLY_PROJECTIONS,
	});

	if (relationship === null) {
		return null;
	}

	return relationship.distance;
}

async function isChildrenByAncestorIdAndUserId(ancestorId, userId) {
	const distance = await findOne({
		where: {
			userId,
			ancestorId,
			distance: ENUM_RELATIONSHIP_DISTANCE.CHILDREN,
		},
		attributes: DISTANCE_ONLY_PROJECTIONS,
	});

	if (distance === null) {
		return false;
	}

	return true;
}

async function isDescentdantByAncestorIdAndUserId(ancestorId, userId) {
	const distance = await findOne({
		where: {
			userId,
			ancestorId,
			distance: {
				[Op.gt]: ENUM_RELATIONSHIP_DISTANCE.ME,
			},
		},
		attributes: DISTANCE_ONLY_PROJECTIONS,
	});

	if (distance === null) {
		return false;
	}

	return true;
}

function getAncestorAndMeRelationshipsByUserId(userId, {
	transaction,
	lock,
	projections,
} = {}) {
	return find({
		transaction,
		lock,
		where: {
			userId,
		},
		order: [[
			"distance", "asc"
		]],
		attributes: projections,
	});
}

function getAncestorRelationshipsByUserId(userId, {
	order = "asc",
	transaction,
	lock,
	projections,
} = {}) {
	return find({
		transaction,
		lock,
		where: {
			userId,
			distance: {
				[Op.gt]: ENUM_RELATIONSHIP_DISTANCE.ME,
			},
		},
		order: [[
			"distance", order
		]],
		attributes: projections,
	});
}

function getDescendantRelationshipsByUserId(userId, {
	transaction,
	lock,
	projections,
}) {
	return find({
		transaction,
		lock,
		where: {
			ancestorId: userId,
			distance: {
				[Op.gt]: ENUM_RELATIONSHIP_DISTANCE.ME,
			},
		},
		attributes: projections,
	});
}

function createRelationships(rows, {
	transaction,
} = {}) {
	return insertMany(rows, { transaction });
}

module.exports = {
	createRelationships,
	getAncestorAndMeRelationshipsByUserId,
	getAncestorAndMeRelationshipsByAncestorIdAndUserId,
	getAncestorRelationshipsByUserId,
	getDescendantRelationshipsByUserId,
	getChildrenAndMeRelationshipsByUserId,
	getChildrenRelationshipsByUserId,
	getDistanceByAncestorIdAndUserId,
	isChildrenByAncestorIdAndUserId,
	isDescentdantByAncestorIdAndUserId,

	MIN_PROJECTIONS,
	DISTANCE_ONLY_PROJECTIONS,
	USERID_ONLY_PROJECTIONS,
	ANCESTOR_PROJECTIONS,
	ANCESTORID_ONLY_PROJECTIONS,
};

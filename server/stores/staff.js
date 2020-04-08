const RoleModel = require("../models/role");
const RoleRelationshipModel = require("../models/role-relationship");
const SQLWhereClauseBuilder = require("../lib/sequlize-query-builder/sql-where-clause-builder");
const {
	findOne,
	findAndCountAll,
	update,
	create,
} = require("../models/staff");
const {
	getOffsetByPageAndLimit,
} = require('./index');

const USERNAME_ONLY_PROJECTIONS = [
	"id",
	"username",
];

function getStaffByUsername(username, {
	projections,
} = {}) {
	return findOne({
		where: {
			username,
		},
		raw: false,
		attributes: projections,
	});
}

function getStaffById(id, {
	projections,
} = {}) {
	return findOne({
		where: {
			id,
		},
		raw: false,
		attributes: projections,
	});
}

function getStaffWithRoleById(id, {
	projections
} = {}) {
	return findOne({
		where: {
			id,
		},
		include: [{
			model: RoleModel.getInstance(),
			as: "role",
			required: true,
		}],
		raw: false,
		attributes: projections,
		subQuery: false,
	});
}

async function getStaffsWithRoleByAncestorRoleIdAndPagination(ancestorRoleId, page, {
	username,
	limit,
}, {
	projections,
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);
	const where = new SQLWhereClauseBuilder()
		.setEqual('username', username)
		.build();

	const { count: numOfItems, rows: data } = await findAndCountAll({
		where,
		include: [
			{
				model: RoleModel.getInstance(),
				as: 'role',
			},
			{
				model: RoleRelationshipModel.getInstance(),
				as: 'roleRelationships',
				where: {
					ancestorRoleId,
				},
				attributes: [],
				required: true,
			},
		],
		order: [
			['username', 'asc'],
		],
		offset,
		limit,
		raw: false,
		subQuery: false,
		attributes: projections,
	});

	return {
		data: data.map(row => row.toJSON()),
		numOfItems,
		numOfPages: Math.ceil(numOfItems / limit),
	};
}

function updateLoginAuditById(id, {
	ip,
	geo,
	loginAt,
}) {
	return update({
		ip,
		geo,
		loginAt,
	}, {
		where: {
			id,
		},
	});
}

function createStaff(row) {
	return create(row);
}

function updateStaffById(id, {
	status,
	roleId,
	description,
} = {}) {
	return update({
		status,
		roleId,
		description,
	}, {
		where: {
			id,
		},
	});
}

function updateLoginPasswordUpdatedAtById(id, loginPasswordUpdatedAt) {
	return update({
		loginPasswordUpdatedAt,
	}, {
		where: {
			id,
		},
	});
}

module.exports = {
	getStaffByUsername,
	getStaffById,
	getStaffWithRoleById,
	getStaffsWithRoleByAncestorRoleIdAndPagination,
	updateLoginAuditById,
	createStaff,
	updateStaffById,
	updateLoginPasswordUpdatedAtById,

	USERNAME_ONLY_PROJECTIONS,
};

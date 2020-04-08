const {
	findOne,
	getInstance,
} = require("../models/role");
const {
	ENUM_ROLE_STATUS,
	ENUM_ROLE_RELATIONSHIP_DISTANCE,
} = require("../lib/enum");
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const NAME_ONLY_PROJECTIONS = [
	"id", "name",
];

function getRoleWithActiveDescendantsById(id, {
	projections,
} = {}) {
	return findOne({
		where: {
			id,
		},
		include: [
			{
				model: getInstance(),
				where: {
					status: ENUM_ROLE_STATUS.ACTIVE,
				},
				through: {
					where: {
						ancestorRoleId: id,
						distance: {
							[Op.gte]: ENUM_ROLE_RELATIONSHIP_DISTANCE.ME,
						},
					},
					attributes: [],
				},
				as: "descendantRoles",
				attributes: projections,
				required: false,
			}
		],
		attributes: projections,
		raw: false,
		subQuery: false,
	});
}

async function getDescendantRolesWithParentById(id, {
	projections,
} = {}) {
	const role = await findOne({
		where: {
			id,
		},
		include: [
			{
				model: getInstance(),
				as: 'descendantRoles',
				through: {
					where: {
						ancestorRoleId: id,
						distance: {
							[Op.gt]: ENUM_ROLE_RELATIONSHIP_DISTANCE.ME,
						},
					},
					attributes: [],
				},
				include: [
					{
						model: getInstance(),
						as: 'ancestorRoles',
						through: {
							where: {
								distance: ENUM_ROLE_RELATIONSHIP_DISTANCE.PARENT,
							},
							attributes: [],
						},
					},
				],
				required: true,
			},
		],
		attributes: projections,
		raw: false,
		subQuery: false,
	});

	return (role !== null) ? role.descendantRoles : [];
}

module.exports = {
	getRoleWithActiveDescendantsById,
	getDescendantRolesWithParentById,

	NAME_ONLY_PROJECTIONS,
};

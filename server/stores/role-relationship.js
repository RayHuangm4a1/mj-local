const Sequelize = require("sequelize");
const { Op } = Sequelize;
const {
	count
} = require("../models/role-relationship");
const {
	ENUM_ROLE_RELATIONSHIP_DISTANCE,
} = require("../lib/enum");

async function isDescendantRoleByAncestorRoleIdAndDescendantRoleId(ancestorRoleId, descendantRoleId) {
	const result = await count({
		where: {
			roleId: descendantRoleId,
			ancestorRoleId,
			distance: {
				[Op.gt]: ENUM_ROLE_RELATIONSHIP_DISTANCE.ME,
			},
		},
	});

	return result === 1;
}

module.exports = {
	isDescendantRoleByAncestorRoleIdAndDescendantRoleId,
};


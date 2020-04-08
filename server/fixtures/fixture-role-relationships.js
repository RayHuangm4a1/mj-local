const RoleRelationshipModel = require("../models/role-relationship");
const fixturedRoleRelationships = require("./data/role-relationship");
const logger = require("ljit-logger")("debug");

async function bulkCreateRoleRelationshipsDocument () {
	const preparedRoleRelationships = [];

	for (let i = 0; i < fixturedRoleRelationships.length; i++) {
		const { role, ancestors } = fixturedRoleRelationships[i];

		preparedRoleRelationships.push({
			roleId: role.id,
			ancestorRoleId: role.id,
			distance: 0,
		});

		for (let j = 0; j < ancestors.length; j++) {
			const ancestor = ancestors[j];

			preparedRoleRelationships.push({
				roleId: role.id,
				ancestorRoleId: ancestor.id,
				distance: j + 1,
			});
		}
	}

	await RoleRelationshipModel.insertMany(preparedRoleRelationships);
}

async function init() {
	try {
		await bulkCreateRoleRelationshipsDocument();
		logger.info("[mysql][role-relationship] fixture done");
	} catch (error) {
		logger.info("[mysql][role-relationship] fixture failed", error.stack);
	}
}

function drop() {
	return RoleRelationshipModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

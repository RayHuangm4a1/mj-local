const RoleModel = require("../models/role");
const fixturedRoles = require("./data/role");
const logger = require("ljit-logger")("debug");

async function bulkCreateRolesDocument () {
	await RoleModel.insertMany(fixturedRoles);
}

async function init() {
	try {
		await bulkCreateRolesDocument();
		logger.info("[mysql][role] fixture done");
	} catch (error) {
		logger.info("[mysql][role] fixture failed", error.stack);
	}
}

function drop() {
	return RoleModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

const ManagementLogModel = require("../models/management-log");
const logger = require("ljit-logger")("debug");

async function init() {
	try {
		await ManagementLogModel.createTTLIndex("createdAt", {
			expiredAfterSeconds: 86400 * 30,
		});

		logger.info("[mysql][management-logs] fixture done");
	} catch (error) {
		logger.info("[mysql][management-logs] fixture failed", error.stack);
	}
}

function drop() {
	return ManagementLogModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

const TeamDurationStatsModel = require("../models/team-duration-stats");
const logger = require("ljit-logger")("debug");

async function init() {
	try {
		await TeamDurationStatsModel.createTTLIndex("createdAt", {
			expiredAfterSeconds: 86400 * 30 * 3,
		});

		logger.info("[mysql][team-duration-stats] fixture done");
	} catch (error) {
		logger.info("[mysql][team-duration-stats] fixture failed", error.stack);
	}
}

function drop() {
	return TeamDurationStatsModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

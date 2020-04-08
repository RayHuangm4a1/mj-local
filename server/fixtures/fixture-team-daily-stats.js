const TeamDailyStatsModel = require("../models/team-daily-stats");
const logger = require("ljit-logger")("debug");

async function init() {
	try {
		await TeamDailyStatsModel.createTTLIndex("createdAt", {
			expiredAfterSeconds: 86400 * 30 * 3,
		});

		logger.info("[mysql][team-daily-stats] fixture done");
	} catch (error) {
		logger.info("[mysql][team-daily-stats] fixture failed", error.stack);
	}
}

function drop() {
	return TeamDailyStatsModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

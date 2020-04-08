const UserDailyStatsModel = require("../models/user-daily-stats");
const logger = require("ljit-logger")("debug");

async function init() {
	try {
		await UserDailyStatsModel.createTTLIndex("createdAt", {
			expiredAfterSeconds: 86400 * 30 * 3,
		});

		logger.info("[mysql][user-daily-stats] fixture done");
	} catch (error) {
		logger.info("[mysql][user-daily-stats] fixture failed", error.stack);
	}
}

function drop() {
	return UserDailyStatsModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

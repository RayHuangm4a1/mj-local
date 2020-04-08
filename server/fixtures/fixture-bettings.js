const BettingModel = require("../models/betting");
const logger = require("ljit-logger")("debug");

async function init() {
	try {
		await BettingModel.createRangeTTLPartitions({
			partitionedByDays: 10,
			expiredAfterDays: 60,
		});

		logger.info("[mysql][bettings] fixture done");
	} catch (error) {
		logger.info("[mysql][bettings] fixture failed", error.stack);
	}
}

function drop() {
	return BettingModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

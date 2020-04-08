const TraceModel = require("../models/trace");
const logger = require("ljit-logger")("debug");

async function init() {
	try {
		await TraceModel.createRangeTTLPartitions({
			partitionedByDays: 10,
			expiredAfterDays: 60,
		});

		logger.info("[mysql][traces] fixture done");
	} catch (error) {
		logger.info("[mysql][traces] fixture failed", error.stack);
	}
}

function drop() {
	return TraceModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

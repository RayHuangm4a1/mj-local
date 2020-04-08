const TransactionLogModel = require("../models/transaction-log");
const logger = require("ljit-logger")("debug");

async function init() {
	try {
		await TransactionLogModel.createRangeTTLPartitions({
			partitionedByDays: 10,
			expiredAfterDays: 60,
		});

		logger.info("[mysql][transaction-logs] fixture done");
	} catch (error) {
		logger.info("[mysql][transaction-logs] fixture failed", error.stack);
	}
}

function drop() {
	return TransactionLogModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

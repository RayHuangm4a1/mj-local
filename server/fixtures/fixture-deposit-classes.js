const DepositClassModel = require("../models/deposit-class");
const fixturedDepositClasses = require("./data/deposit-class");
const logger = require("ljit-logger")("debug");

async function bulkCreateDepositClassesDocument () {
	await DepositClassModel.insertMany(fixturedDepositClasses);
}

async function init() {
	try {
		await bulkCreateDepositClassesDocument();
		logger.info("[mysql][deposit-class] fixture done");
	} catch (error) {
		logger.info("[mysql][deposit-class] fixture failed", error.stack);
	}
}

function drop() {
	return DepositClassModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

const { product } = require("../../env");

global.CONFIG = require("../../config").getServer(product);

require("ljit-db/sequelize").connect(global.CONFIG.mysqlURL);

const DepositAmountModel = require("../models/deposit-amount");
const fixturedDepositAmounts = require("./data/testing-deposit-amount");

const logger = require("ljit-logger")("debug");

async function bulkCreateDepositAmountsDocument () {
	await DepositAmountModel.insertMany(fixturedDepositAmounts);
}

async function start() {
	try {
		await bulkCreateDepositAmountsDocument();

		logger.info("[mysql][testing-deposit-amount] fixture done");
		process.exit();
	} catch (error) {
		logger.info("[mysql][testing-deposit-amount] fixture failed", error.stack);

		process.exit(1);
	}
}

start();

const { product } = require("../../env");

global.CONFIG = require("../../config").getServer(product);

require("ljit-db/sequelize").connect(global.CONFIG.mysqlURL);

const DepositApplicationFormModel = require("../models/deposit-application-form");
const fixturedDepositApplicationForms = require("./data/testing-deposit-application-form");

const logger = require("ljit-logger")("debug");

async function bulkCreateDepositApplicationFormsDocument () {
	await DepositApplicationFormModel.insertMany(fixturedDepositApplicationForms);
}

async function start() {
	try {
		await bulkCreateDepositApplicationFormsDocument();

		logger.info("[mysql][testing-deposit-application-form] fixture done");
		process.exit();
	} catch (error) {
		logger.info("[mysql][testing-deposit-application-form] fixture failed", error.stack);

		process.exit(1);
	}
}

start();

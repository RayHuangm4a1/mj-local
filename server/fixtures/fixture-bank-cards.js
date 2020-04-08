const BankCardModel = require("../models/bank-card");
const fixturedBankCards = require("./data/bank-card");
const logger = require("ljit-logger")("debug");

async function createBankCardsDocuments () {
	await BankCardModel.insertMany(fixturedBankCards);
}

async function init() {
	try {
		await createBankCardsDocuments();
		logger.info("[mysql][bank-cards] fixture done");
	} catch (error) {
		logger.info("[mysql][bank-cards] fixture failed", error.stack);
	}
}

async function drop() {
	await BankCardModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

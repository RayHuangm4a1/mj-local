const logger = require("ljit-logger")("debug");
const PaymentAccountModel = require("../models/payment-account");
const fixturedPaymentAccounts = require("./data/payment-account");

async function createPaymentAccountsDocuments () {
	await PaymentAccountModel.insertMany(fixturedPaymentAccounts);
}

async function init() {
	try {
		await createPaymentAccountsDocuments();
		logger.info("[mysql][payment-accounts] fixture done");
	} catch (error) {
		logger.info("[mysql][payment-accounts] fixture failed", error.stack);
	}
}

function drop() {
	return PaymentAccountModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

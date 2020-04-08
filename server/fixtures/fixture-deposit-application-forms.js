const DepositApplicationFormModel = require("../models/deposit-application-form");
const logger = require("ljit-logger")("debug");

async function init() {
	try {
		await DepositApplicationFormModel.createTTLIndex("createdAt", {
			expiredAfterSeconds: 86400 * 45,
		});
		
		logger.info("[mysql][deposit-application-forms] fixture done");
	} catch (error) {
		logger.info("[mysql][deposit-application-forms] fixture failed", error.stack);
	}
}

function drop() {
	return DepositApplicationFormModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

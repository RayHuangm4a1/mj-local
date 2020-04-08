const WithdrawalApplicationFormModel = require("../models/withdrawal-application-form");
const logger = require("ljit-logger")("debug");

async function init() {
	try {
		await WithdrawalApplicationFormModel.createTTLIndex("createdAt", {
			expiredAfterSeconds: 86400 * 45,
		});

		logger.info("[mysql][withdrawal-application-forms] fixture done");
	} catch (error) {
		logger.info("[mysql][withdrawal-application-forms] fixture failed", error.stack);
	}
}

function drop() {
	return WithdrawalApplicationFormModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

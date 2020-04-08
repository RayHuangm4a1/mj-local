const DrawingModel = require("../models/drawing");
const logger = require("ljit-logger")("debug");

async function init() {
	try {
		await DrawingModel.createTTLIndex("createdAt", {
			expiredAfterSeconds: 86400 * 30,
		});
		
		logger.info("[mysql][drawings] fixture done");
	} catch (error) {
		logger.info("[mysql][drawings] fixture failed", error.stack);
	}
}

function drop() {
	return DrawingModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

const PlatformModel = require("../models/platform");
const fixturedPlatform = require("./data/platform");
const logger = require("ljit-logger")("debug");

async function createPlatformDocument () {
	await PlatformModel.create(fixturedPlatform);
}

async function init() {
	try {
		await createPlatformDocument();
		logger.info("[mysql][platform] fixture done");
	} catch (error) {
		logger.info("[mysql][platform] fixture failed", error.stack);
	}
}

function drop() {
	return PlatformModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

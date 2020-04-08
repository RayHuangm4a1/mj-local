const LevelModel = require("../models/level");
const fixturedLevels = require("./data/level");
const logger = require("ljit-logger")("debug");

async function bulkCreateLevelsDocument () {
	await LevelModel.insertMany(fixturedLevels);
}

async function init() {
	try {
		await bulkCreateLevelsDocument();
		logger.info("[mysql][level] fixture done");
	} catch (error) {
		logger.info("[mysql][level] fixture failed", error.stack);
	}
}

function drop() {
	return LevelModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

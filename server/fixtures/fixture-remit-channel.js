const logger = require("ljit-logger")("debug");
const RemitChannelModel = require("../models/remit-channel");
const fixturedRemitChannels = require("./data/remit-channel");

async function createRemitChannelsDocuments () {
	await RemitChannelModel.insertMany(fixturedRemitChannels);
}

async function init() {
	try {
		await createRemitChannelsDocuments();
		logger.info("[mysql][remit-channels] fixture done");
	} catch (error) {
		logger.info("[mysql][remit-channels] fixture failed", error.stack);
	}
}

function drop() {
	return RemitChannelModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

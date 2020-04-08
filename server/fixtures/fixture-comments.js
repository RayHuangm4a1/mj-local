const CommentModel = require("../models/comment");
const logger = require("ljit-logger")("debug");

async function init() {
	try {
		await CommentModel.createTTLIndex("createdAt", {
			expiredAfterSeconds: 86400 * 30 * 6,
		});
		
		logger.info("[mysql][comments] fixture done");
	} catch (error) {
		logger.info("[mysql][comments] fixture failed", error.stack);
	}
}

function drop() {
	return CommentModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;

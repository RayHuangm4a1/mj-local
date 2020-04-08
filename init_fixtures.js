const logger = require("ljit-logger")("debug");

require("./server/fixtures")().then(() => {
	logger.info("[mysql] fixtures done");
});
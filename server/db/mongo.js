const mongoose = require('mongoose');
const config = global.CONFIG;
const logger = require("ljit-logger");

exports.initialize = function () {
	mongoose.Promise = global.Promise;

	logger.info("initialize mongoDB...");
	const conn = mongoose.connect(config.mongoURL, {
		useMongoClient: true,
		config: { autoIndex: true },
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: 3000,
		poolSize: 200,
		bufferMaxEntries: 0,
		connectTimeoutMS: 10000,
		socketTimeoutMS: 45000,
	}, function (error) {
		if (error) {
			logger.error("please make sure mongodb is running", config.mongoURL);
			return;
		}

		logger.info("connected to mongoDB", config.mongoURL);
	});
};

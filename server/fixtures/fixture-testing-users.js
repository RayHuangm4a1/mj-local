const { product } = require("../../env");

global.CONFIG = require("../../config").getServer(product);

const {
	connect,
} = require("ljit-db/sequelize");
const fixturedUsers = require("./data/testing-user");

const logger = require("ljit-logger")("debug");

async function start() {
	try {
		await connect(global.CONFIG.mysqlURL);

		const {
			createUsersDocuments,
		} = require("./fixture-users");

		await createUsersDocuments(fixturedUsers);

		logger.info("[mysql][testing-users] fixture done");
		process.exit();
	} catch (error) {
		logger.info("[mysql][testing-users] fixture failed", error.stack);

		process.exit(1);
	}
}

start();

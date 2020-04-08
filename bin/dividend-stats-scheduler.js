const Promise = require("bluebird");
const { product } = require("../env");

global.Promise = Promise;
global.PRODUCT = product;
global.CONFIG = require("../config").getServer(global.PRODUCT);
global.LOGGER = require("ljit-logger")(global.CONFIG.logLevel);
global.SQL_LOGGING = global.CONFIG.sqlLogging;

const {
	mysqlURL,
} = global.CONFIG;

require("ljit-error").initialize();
require("ljit-db/sequelize").connect(mysqlURL, { logging: global.SQL_LOGGING });

const cronjobServices = require("../server/cronjob-services");
const orchestrationServices = require("../server/orchestration-services");
const eventServices = require("../server/event-services");

eventServices.get("dividend-stats-worker").subscribe();
eventServices.get("grant-zhaoshang-dividends-worker").subscribe();
orchestrationServices.get("dividend-stats-orchestrator").subscribe();

cronjobServices.get("dividend-stats-cronjob").start();

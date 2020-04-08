const Promise = require("bluebird");
const { product } = require("../env");

global.Promise = Promise;
global.PRODUCT = product;
global.CONFIG = require("../config").getServer(global.PRODUCT);
global.LOGGER = require("ljit-logger")(global.CONFIG.logLevel);
global.SQL_LOGGING = global.CONFIG.sqlLogging;
global.IS_OPEN_BETTING_CRONJOB_FINISHED = true;

const {
	mysqlURL,
} = global.CONFIG;

require("ljit-error").initialize();
require("ljit-db/sequelize").connect(mysqlURL, { logging: global.SQL_LOGGING });

const cronjobServices = require("../server/cronjob-services");
const orchestrationServices = require("../server/orchestration-services");
const eventServices = require("../server/event-services");

eventServices.get("open-betting-worker").subscribe();
eventServices.get("grant-commission-worker").subscribe();
eventServices.get("terminate-trace-worker").subscribe();
eventServices.get("cancel-betting-worker").subscribe();
eventServices.get("renew-betting-worker").subscribe();
orchestrationServices.get("open-betting-orchestrator").subscribe();

cronjobServices.get("open-betting-cronjob").start();

const Promise = require("bluebird");
const { product } = require("../env");

global.Promise = Promise;
global.PRODUCT = product;
global.CONFIG = require("../config").getServer(global.PRODUCT);
global.LOGGER = require("ljit-logger")(global.CONFIG.logLevel);
global.SQL_LOGGING = global.CONFIG.sqlLogging;
global.IS_WITHDRAWAL_CRONJOB_FINISHED = true;

const {
	mysqlURL,
} = global.CONFIG;

require("ljit-error").initialize();
require("ljit-db/sequelize").connect(mysqlURL, { logging: global.SQL_LOGGING });

const cronjobServices = require("../server/cronjob-services");
const orchestrationServices = require("../server/orchestration-services");
const eventServices = require("../server/event-services");

eventServices.get("check-auto-remit-worker").subscribe();
eventServices.get("remit-using-bank-worker").subscribe();
eventServices.get("remit-using-third-party-worker").subscribe();
orchestrationServices.get("auto-remit-orchestrator").subscribe();

cronjobServices.get("auto-remit-cronjob").start();

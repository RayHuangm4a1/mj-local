const Promise = require("bluebird");
const { product } = require("../env");
const Endpoint = require("mj-service-sdks/endpoint");

global.Promise = Promise;
global.PRODUCT = product;
global.CONFIG = require("../config").getServer(global.PRODUCT);
global.LOGGER = require("ljit-logger")(global.CONFIG.logLevel);
global.SQL_LOGGING = global.CONFIG.sqlLogging;
global.IS_EARLY_OPENED_DRAWING_RISK_CRONJOB_FINISHED = true;

const {
	mysqlURL,
	service,
} = global.CONFIG;

global.LOTTERY_MANAGEMENT_ENDPOINT = new Endpoint(service.management.domain);
global.LOTTERY_MANAGEMENT_API_VERSION = service.apiVersion;
global.ADMIN_JWT = service.adminJwt;

require("ljit-error").initialize();
require("ljit-db/sequelize").connect(mysqlURL, { logging: global.SQL_LOGGING });
require("ljit-redis").createClient({
	host: global.REDIS_HOST,
	port: global.REDIS_PORT,
});

const cronjobServices = require("../server/cronjob-services");
const orchestrationServices = require("../server/orchestration-services");
const eventServices = require("../server/event-services");

eventServices.get("early-opened-drawing-risk-worker").subscribe();
orchestrationServices.get("early-opened-drawing-risk-orchestrator").subscribe();

cronjobServices.get("early-opened-drawing-risk-cronjob").start();

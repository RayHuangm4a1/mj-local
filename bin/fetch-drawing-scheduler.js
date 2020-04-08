const Promise = require("bluebird");
const { product } = require("../env");
const Credentials = require("mj-service-sdks/credentials");
const Endpoint = require("mj-service-sdks/endpoint");
const LotteryClient = require("mj-service-sdks/lottery/client");

global.Promise = Promise;
global.PRODUCT = product;
global.CONFIG = require("../config").getServer(global.PRODUCT);
global.LOGGER = require("ljit-logger")(global.CONFIG.logLevel);
global.SQL_LOGGING = global.CONFIG.sqlLogging;

const {
	redis,
	mysqlURL,
	appId,
	appSecret,
	service,
} = global.CONFIG;
global.REDIS_HOST = redis.host;
global.REDIS_PORT = redis.port;

require("ljit-redis").createClient({
	host: global.REDIS_HOST,
	port: global.REDIS_PORT,
});

global.LOTTERY_CLIENT = new LotteryClient(
	new Endpoint(service.client.domain),
	new Credentials(appId, appSecret)
).setVersion(service.apiVersion);

require("ljit-error").initialize();
require("ljit-db/sequelize").connect(mysqlURL, { logging: global.SQL_LOGGING });

const cronjobServices = require("../server/cronjob-services");
const orchestrationServices = require("../server/orchestration-services");
const eventServices = require("../server/event-services");

eventServices.get("fetch-drawing-worker").subscribe();
orchestrationServices.get("fetch-drawing-orchestrator").subscribe();

cronjobServices.get("fetch-drawing-cronjob").start();

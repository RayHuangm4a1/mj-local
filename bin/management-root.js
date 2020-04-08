const Promise = require("bluebird");
const emitter = require("../server/lib/event-emitter");
const { product } = require("../env");
const config = require("../config");
const Endpoint = require("mj-service-sdks/endpoint");
const Credentials = require("mj-service-sdks/credentials");
const LotteryClient = require("mj-service-sdks/lottery/client");
const AccountClient = require("mj-service-sdks/account/client");
const HighLevelProducer = require("ljit-mq/kafka/producer");

global.Promise = Promise;
global.PRODUCT = product;
global.CONFIG = config.getServer(global.PRODUCT);

const {
	port,
	logLevel,
	kafka,
	event,
	sqlLogging,
	redis,
	mysqlURL,
	service,
	appId,
	appSecret,
} = global.CONFIG;

global.MODE = config.getMode(global.PRODUCT);
global.MANAGEMENT_PORT = port.management;
global.LOG_LEVEL = logLevel;
global.SQL_LOGGING = sqlLogging;
global.EMITTER = emitter;
global.REDIS_HOST = redis.host;
global.REDIS_PORT = redis.port;
global.MYSQL_URL = mysqlURL;
global.LOGGER = require("ljit-logger")(global.LOG_LEVEL);
global.LOTTERY_CLIENT = new LotteryClient(
	new Endpoint(service.client.domain),
	new Credentials(appId, appSecret)
).setVersion(service.apiVersion);
global.LOTTERY_MANAGEMENT_ENDPOINT = new Endpoint(service.management.domain);
global.LOTTERY_MANAGEMENT_API_VERSION = service.apiVersion;
global.ACCOUNT_MANAGEMENT_ENDPOINT = new Endpoint(service.management.domain);
global.ACCOUNT_MANAGEMENT_API_VERSION = service.apiVersion;
global.KAFKA_BROKER = kafka.broker;
global.ACCOUNT_ARCHIVE_TOPIC = event.account.archive.topic;
global.ACCOUNT_ARCHIVE_PRODUCER = new HighLevelProducer({
	broker: global.KAFKA_BROKER,
	topic: global.ACCOUNT_ARCHIVE_TOPIC,
});
global.ACCOUNT_CLIENT = new AccountClient(
	new Endpoint(service.client.domain),
	new Credentials(appId, appSecret)
).setVersion(service.apiVersion);

require("ljit-redis").createClient({
	host: global.REDIS_HOST,
	port: global.REDIS_PORT,
});

require("ljit-error").initialize();
require("ljit-db/sequelize").connect(mysqlURL, { logging: global.SQL_LOGGING }).then(() => {
	const app = require('../server/management');

	require("./root")(app, global.MANAGEMENT_PORT);
});
require("../server/passport").setManagementLoginStrategies();

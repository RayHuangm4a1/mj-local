const Promise = require("bluebird");
const emitter = require("../server/lib/event-emitter");
const { product } = require("../env");
const Credentials = require("mj-service-sdks/credentials");
const Endpoint = require("mj-service-sdks/endpoint");
const AccountClient = require("mj-service-sdks/account/client");
const LotteryClient = require("mj-service-sdks/lottery/client");
const HighLevelProducer = require("ljit-mq/kafka/producer");
const config = require("../config");

global.Promise = Promise;
global.PRODUCT = product;
global.CONFIG = config.getServer(global.PRODUCT);

const {
	port,
	logLevel,
	sqlLogging,
	redis,
	kafka,
	mysqlURL,
	appId,
	appSecret,
	service,
	event,
} = global.CONFIG;

global.MODE = config.getMode(global.PRODUCT);
global.CLIENT_PORT = port.client;
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
global.ACCOUNT_CLIENT = new AccountClient(
	new Endpoint(service.client.domain),
	new Credentials(appId, appSecret)
).setVersion(service.apiVersion);
global.KAFKA_BROKER = kafka.broker;
global.ACCOUNT_ARCHIVE_TOPIC = event.account.archive.topic;
global.ACCOUNT_ARCHIVE_PRODUCER = new HighLevelProducer({
	broker: global.KAFKA_BROKER,
	topic: global.ACCOUNT_ARCHIVE_TOPIC,
});

require("ljit-redis").createClient({
	host: global.REDIS_HOST,
	port: global.REDIS_PORT,
});

require("ljit-error").initialize();
require("ljit-db/sequelize").connect(mysqlURL, {
	maxPoolSize: 10,
	minPoolSize: 1,
	logging: global.SQL_LOGGING,
}).then(() => {
	const app = require("../server/client");

	require("./root")(app, global.CLIENT_PORT);
});
require("../server/passport").setClientLoginStrategies();

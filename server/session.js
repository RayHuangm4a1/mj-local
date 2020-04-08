const expressSession = require('express-session');
const redisStore = require('connect-redis')(expressSession);
const mongoStore = require('connect-mongo')(expressSession);
const config = global.CONFIG;

const session = (params = {}) => {
	const options = params;

	options.saveUninitialized = false;
	options.resave = false;

	switch (config.sessionStorage) {
		case 'redis':
			global.LOGGER.info('use redis as session storage, connect to redis://' + global.REDIS_HOST + ':' + global.REDIS_PORT);
			options.store = new redisStore({
				host: global.REDIS_HOST,
				port: global.REDIS_PORT,
				ttl: config.sessionTTL,
			});
			break;
		case 'mongo':
			global.LOGGER.info('use mongo as session storage, connect to ' + global.MONGO_URL);
			options.store = new mongoStore({
				url: global.MONGO_URL,
				ttl: config.sessionTTL,
			});
			break;
		case 'local':
		default:
			global.LOGGER.info('use local as session storage');
			break;
	}

	return expressSession(options);
};

module.exports = session;

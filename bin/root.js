const debug = require('debug')('plugin:server');
const http = require("http");
const mode = global.MODE;

module.exports = function (app, port) {
	app.set("port", port);
	const server = http.createServer(app);

	server.listen(port, function () {
		global.LOGGER.info("started server on port " + port);
		global.LOGGER.info("server is running on mode: " + mode);
	});
	server.on('error', onError);
	server.on('listening', onListening);

	function onError(error) {
		if (error.syscall !== 'listen') {
			throw error;
		}

		var bind = typeof port === 'string'
			? 'Pipe ' + port
			: 'Port ' + port;

		switch (error.code) {
			case 'EACCES':
				global.LOGGER.error(bind + ' requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				global.LOGGER.error(bind + ' is already in use');
				process.exit(1);
				break;
			default:
				throw error;
		}
	}

	function onListening() {
		var addr = server.address();
		var bind = typeof addr === 'string'
			? 'pipe ' + addr
			: 'port ' + addr.port;

		debug('Listening on ' + bind);
	}
};

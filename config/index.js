const ServerConfig = require("./config");

module.exports = {
	getServer: function (product) {
		switch (product) {
			case "mj":
				return ServerConfig.server;
			default:
				throw new Error(`invalid product: ${product}`);
		}
	},
	getClient: function (product) {
		switch (product) {
			case "mj":
				return ServerConfig.client;
			default:
				throw new Error(`invalid product: ${product}`);
		}
	},
	getManagement: function (product) {
		switch (product) {
			case "mj":
				return ServerConfig.management;
			default:
				throw new Error(`invalid product: ${product}`);
		}
	},
	getMode: function (product) {
		switch (product) {
			case "mj":
				return ServerConfig.mode;
			default:
				throw new Error(`invalid product: ${product}`);
		}
	},
};

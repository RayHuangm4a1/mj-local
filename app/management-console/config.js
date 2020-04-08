const env = require("../../env");
const config = require("../../config");

module.exports = {
	get: function () {
		return config.getManagement(env.product);
	}
};

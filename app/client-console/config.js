const env = require('../../env');
const config = require('../../config');

module.exports = {
	get: function () {
		return config.getClient(env.product);
	}
};

const compose = require('compose-middleware').compose;
const {
	preparePlatform,
} = require("../../../platform");

exports.before = compose([
	preparePlatform()
]);

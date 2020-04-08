const compose = require('compose-middleware').compose;
const {
	preparePlatform,
} = require("../../../platform");
const {
	PLATFORM_PROJECTIONS,
} = require("../../../../services/platform");

exports.before = compose([
	preparePlatform(PLATFORM_PROJECTIONS.DIVIDEND_DURATION)
]);

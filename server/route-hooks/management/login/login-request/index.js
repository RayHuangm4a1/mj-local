const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	PLATFORM_PROJECTIONS,
} = require("../../../../services/platform");
const {
	preparePlatform,
} = require("../../../platform");
const {
	authenticateManagementLoginCredentials,
} = require("../../../authentication");

exports.before = compose([
	validateRequestPayload,
	preparePlatform(PLATFORM_PROJECTIONS.LOGIN),
	authenticateManagementLoginCredentials,
]);

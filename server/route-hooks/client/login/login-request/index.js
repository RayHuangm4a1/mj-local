const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	authenticateClientLoginCredentials,
} = require("../../../authentication");
const {
	isNumOfFailedLoginReachLimit,
} = require("../common");

exports.before = compose([
	validateRequestPayload,
	authenticateClientLoginCredentials,
	isNumOfFailedLoginReachLimit,
]);

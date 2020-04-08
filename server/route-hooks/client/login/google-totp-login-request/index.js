const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	authenticateClientGoogleTOTPLoginCredentials,
} = require("../../../authentication");

exports.before = compose([
	validateRequestPayload,
	authenticateClientGoogleTOTPLoginCredentials,
]);

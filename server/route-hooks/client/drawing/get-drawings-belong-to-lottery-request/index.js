const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	setDefaultLimit,
} = require("../../../common");

exports.before = compose([
	validateRequestPayload,
	setDefaultLimit(),
]);

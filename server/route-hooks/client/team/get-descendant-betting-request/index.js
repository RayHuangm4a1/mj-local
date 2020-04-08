const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	isDescendant
} = require("../common");

exports.before = compose([
	validateRequestPayload,
	isDescendant
]);


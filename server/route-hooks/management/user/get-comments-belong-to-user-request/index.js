const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	setDefaultPage
} = require("../../../common");

exports.before = compose([
	validateRequestPayload,
	setDefaultPage,
]);

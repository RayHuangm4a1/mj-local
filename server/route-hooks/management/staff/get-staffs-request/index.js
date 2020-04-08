const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	setDefaultPage,
	setDefaultLimit,
} = require('../../../common');

exports.before = compose([
	validateRequestPayload,
	setDefaultPage,
	setDefaultLimit(),
]);

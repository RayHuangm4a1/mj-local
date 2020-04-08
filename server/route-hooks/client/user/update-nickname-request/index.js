const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const {
	authenticateLoginPassword,
} = require('../../../authentication');

exports.before = compose([
	validateRequestPayload,
	authenticateLoginPassword,
]);

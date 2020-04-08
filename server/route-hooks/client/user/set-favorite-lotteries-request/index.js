const { compose } = require('compose-middleware');
const validateRequestPayload = require('./validate-request-payload');

exports.before = compose([
	validateRequestPayload,
]);

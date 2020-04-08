const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const {
	authenticateFundsPassword,
} = require('../../../authentication');

exports.before = compose([
	validateRequestPayload,
	authenticateFundsPassword,
]);

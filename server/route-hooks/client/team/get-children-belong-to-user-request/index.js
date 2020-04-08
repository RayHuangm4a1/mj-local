const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const {
	prepareDescendantsBelongToUser,
} = require('../common');
const {
	setDefaultPage,
	setDefaultLimit,
} = require('../../../common');

exports.before = compose([
	validateRequestPayload,
	prepareDescendantsBelongToUser,
	setDefaultPage,
	setDefaultLimit(10),
]);

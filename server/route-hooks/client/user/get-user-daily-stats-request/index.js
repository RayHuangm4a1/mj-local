const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const {
	setDefaultQueriedDates,
	validateQueriedDateRange,
} = require('../../../common');

exports.before = compose([
	validateRequestPayload,
	setDefaultQueriedDates(),
	validateQueriedDateRange(45),
]);

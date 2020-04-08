const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const {
	prepareDescendantsBelongToUser,
} = require('../common');
const {
	setDefaultQueriedDates,
	validateQueriedDateRange,
} = require('../../../common');

exports.before = compose([
	validateRequestPayload,
	setDefaultQueriedDates(),
	validateQueriedDateRange(45),
	prepareDescendantsBelongToUser,
]);

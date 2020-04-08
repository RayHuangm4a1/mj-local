const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const {
	setDefaultPage,
	setDefaultLimit,
	setDefaultSort,
	setDefaultQueriedDates,
	validateQueriedDateRange,
} = require('../../../common');

exports.before = compose([
	validateRequestPayload,
	setDefaultQueriedDates(),
	validateQueriedDateRange(14),
	setDefaultPage,
	setDefaultLimit(),
	setDefaultSort("createdAt", "desc"),
]);

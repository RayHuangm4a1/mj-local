const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const setDefaultTypes = require('./set-default-types');
const {
	setDefaultPage,
	setDefaultLimit,
	setDefaultSort,
	setDefaultQueriedDates,
	validateQueriedDateRange,
} = require("../../../common");

exports.before = compose([
	validateRequestPayload,
	setDefaultQueriedDates(),
	validateQueriedDateRange(14),
	setDefaultPage,
	setDefaultLimit(10),
	setDefaultSort("createdAt", "desc"),
	setDefaultTypes,
]);

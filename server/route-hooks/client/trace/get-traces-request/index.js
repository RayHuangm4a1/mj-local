const compose = require('compose-middleware').compose;
const {
	setDefaultPage,
	setDefaultLimit,
	setDefaultQueriedDates,
	setDefaultSort,
	validateQueriedDateRange,
} = require("../../../common");
const validateRequestPayload = require("./validate-request-payload");

exports.before = compose([
	validateRequestPayload,
	setDefaultQueriedDates(),
	validateQueriedDateRange(14),
	setDefaultPage,
	setDefaultLimit(),
	setDefaultSort("createdAt", "desc"),
]);

const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	setDefaultPage,
	setDefaultLimit,
	setDefaultSort,
	setDefaultQueriedDates,
	validateQueriedDateRange,
	setDefaultDistance,
} = require("../../../common");
const {
	prepareDescendantIdsIfWithQueriedUsername,
	prepareDescendantIdsIfWithoutQueriedUsername,
} = require("../common");

exports.before = compose([
	validateRequestPayload,
	setDefaultQueriedDates(),
	validateQueriedDateRange(14),
	setDefaultDistance,
	setDefaultPage,
	setDefaultLimit(),
	setDefaultSort("createdAt", "desc"),
	prepareDescendantIdsIfWithQueriedUsername,
	prepareDescendantIdsIfWithoutQueriedUsername
]);

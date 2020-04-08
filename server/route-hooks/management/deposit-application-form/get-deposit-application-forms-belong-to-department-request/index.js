const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	setDefaultPage,
	setDefaultLimit,
	setDefaultSort,
	setDefaultQueriedDates,
} = require("../../../common");

exports.before = compose([
	validateRequestPayload,
	setDefaultPage,
	setDefaultLimit(),
	setDefaultSort("createdAt", "desc"),
	setDefaultQueriedDates({ fromField: 'createdAtFrom', toField: 'createdAtTo' }),
]);

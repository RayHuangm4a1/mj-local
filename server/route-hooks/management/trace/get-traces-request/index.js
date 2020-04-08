const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	setDefaultPage,
	setDefaultLimit,
	setDefaultQueriedDates,
} = require("../../../common");
const {
	prepareManagedUserIdIfWithQueriedUsername,
} = require("../../user.common");

exports.before = compose([
	validateRequestPayload,
	setDefaultPage,
	setDefaultLimit(),
	setDefaultQueriedDates(),
	prepareManagedUserIdIfWithQueriedUsername,
]);

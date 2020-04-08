const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	setDefaultLimit,
	setDefaultPage,
	setDefaultSort,
} = require("../../../common");
const {
	prepareManagedUserIdIfWithQueriedUsername,
} = require("../../user.common");

exports.before = compose([
	validateRequestPayload,
	setDefaultPage,
	setDefaultLimit(),
	setDefaultSort("createdAt", "desc"),
	prepareManagedUserIdIfWithQueriedUsername
]);

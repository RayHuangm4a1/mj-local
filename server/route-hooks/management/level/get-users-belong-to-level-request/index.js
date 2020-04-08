const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	setDefaultPage,
	setDefaultLimit,
	setDefaultSort,
} = require("../../../common");
const {
	prepareManagedUserIdIfWithQueriedUsername,
} = require("../../user.common");

exports.before = compose([
	validateRequestPayload,
	setDefaultPage,
	setDefaultLimit(),
	setDefaultSort("loginAt", "desc"),
	prepareManagedUserIdIfWithQueriedUsername
]);

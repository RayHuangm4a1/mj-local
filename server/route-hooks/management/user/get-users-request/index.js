const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const setDefaultUserType = require("./set-default-user-type");
const {
	setDefaultLimit,
	setDefaultPage,
	setDefaultSort,
} = require("../../../common");

exports.before = compose([
	validateRequestPayload,
	setDefaultPage,
	setDefaultLimit(8),
	setDefaultSort("type", "asc"),
	setDefaultUserType,
]);

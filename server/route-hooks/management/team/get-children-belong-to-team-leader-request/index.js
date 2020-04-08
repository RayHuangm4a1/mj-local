const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareAncestorsBelongToLeader = require("./prepare-ancestors-belong-to-team-leader");
const {
	setDefaultLimit,
	setDefaultPage,
} = require("../../../common");

exports.before = compose([
	validateRequestPayload,
	setDefaultPage,
	setDefaultLimit(8),
	prepareAncestorsBelongToLeader,
]);

const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const { prepareManagedUserWithAncestors } = require("../../user.common");
const {
	USER_PROJECTIONS,
} = require("../../../../services/user.admin");

exports.before = compose([
	validateRequestPayload,
	prepareManagedUserWithAncestors({
		ancestorProjections: USER_PROJECTIONS.USERNAME,
	}),
]);

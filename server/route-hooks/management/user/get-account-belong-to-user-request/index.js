const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	prepareManagedUser,
	prepareManagedUserAccount,
} = require("../../user.common");

exports.before = compose([
	validateRequestPayload,
	prepareManagedUser,
	prepareManagedUserAccount
]);

const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const isDefaultPasswordNotChanged = require("./is-default-password-not-changed");
const prepareUser = require("./prepare-user");
const {
	isGuestExisted,
	prepareAccount,
} = require("../common");

exports.before = compose([
	validateRequestPayload,
	isGuestExisted,
	prepareUser,
	prepareAccount,
	isDefaultPasswordNotChanged
]);

const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const prepareBank = require('./prepare-bank');
const {
	prepareManagedUser,
	isManagedUserPayerExisted,
} = require("../../user.common");
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	prepareManagedUser,
	prepareManagementLog,
	isManagedUserPayerExisted,
	prepareBank,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

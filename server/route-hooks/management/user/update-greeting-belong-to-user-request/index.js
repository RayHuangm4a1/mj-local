const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const {
	createSuccessManagementLog,
} = require("../../common.after");
const {
	prepareManagedUser,
} = require("../../user.common");

exports.before = compose([
	validateRequestPayload,
	prepareManagedUser,
	prepareManagementLog
]);

exports.after = compose([
	createSuccessManagementLog
]);

const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const {
	createSuccessManagementLog,
} = require("../../common.after");
const {
	prepareManagedStaff,
	isValidSelectedRole,
	couldNotUpdateSelf,
} = require("../../staff.common");

exports.before = compose([
	validateRequestPayload,
	couldNotUpdateSelf,
	prepareManagedStaff,
	isValidSelectedRole,
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog
]);

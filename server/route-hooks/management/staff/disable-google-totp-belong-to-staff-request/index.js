const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const {
	createSuccessManagementLog,
} = require("../../common.after");
const {
	prepareManagedStaff,
} = require("../../staff.common");

exports.before = compose([
	validateRequestPayload,
	prepareManagedStaff,
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog
]);

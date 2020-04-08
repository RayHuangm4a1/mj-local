const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const validateManagedUserTypeIsEditable = require("./validate-managed-user-type-is-editable");
const prepareManagementLog = require("./prepare-management-log");
const {
	prepareManagedUser,
} = require("../../user.common");
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	prepareManagedUser,
	validateManagedUserTypeIsEditable,
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog
]);

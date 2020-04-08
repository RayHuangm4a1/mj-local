const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const {
	prepareManagedUser,
} = require("../../user.common");
const {
	isValidLevelId,
} = require("../../level.common");
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	prepareManagedUser,
	prepareManagementLog,
	isValidLevelId,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

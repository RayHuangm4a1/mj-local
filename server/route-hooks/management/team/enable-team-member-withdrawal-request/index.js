const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const {
	prepareMemberUser,
} = require("../../user.common");
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	prepareMemberUser,
	prepareManagementLog
]);

exports.after = compose([
	createSuccessManagementLog
]);

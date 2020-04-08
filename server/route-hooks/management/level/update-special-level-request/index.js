const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const { createSuccessManagementLog } = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

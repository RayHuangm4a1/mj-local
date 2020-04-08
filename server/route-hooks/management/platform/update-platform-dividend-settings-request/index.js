const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareDividendSettings = require("./prepare-dividend-settings");
const prepareManagementLog = require("./prepare-management-log");
const { createSuccessManagementLog } = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	prepareDividendSettings,
	prepareManagementLog
]);

exports.after = compose([
	createSuccessManagementLog
]);

const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const couldDrawingBeStopped = require("./could-drawing-be-stopped");
const prepareManagementLog = require("./prepare-management-log");
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	couldDrawingBeStopped,
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

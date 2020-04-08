const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const couldDrawingBeCanceled = require("./could-drawing-be-canceled");
const prepareManagementLog = require("./prepare-management-log");
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	couldDrawingBeCanceled,
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

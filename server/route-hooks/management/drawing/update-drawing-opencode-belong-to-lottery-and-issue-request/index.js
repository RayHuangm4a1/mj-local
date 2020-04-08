const compose = require('compose-middleware').compose;
const validateOpencode = require("./validate-opencode");
const validateRequestPayload = require("./validate-request-payload");
const couldDrawingOpencodeBeUpdated = require("./could-drawing-opencode-be-updated");
const prepareManagementLog = require("./prepare-management-log");
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	validateOpencode,
	couldDrawingOpencodeBeUpdated,
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const {
	PLATFORM_PROJECTIONS,
} = require("../../../../services/platform.admin");
const {
	createSuccessManagementLog,
} = require("../../common.after");
const {
	preparePlatform,
} = require("../../../platform");
const {
	prepareAccountArchievedEvent,
} = require("../../../event");

exports.before = compose([
	preparePlatform(PLATFORM_PROJECTIONS.CREATE_ZHAOSHANG_REQUIRED),
	validateRequestPayload,
	prepareManagementLog,
	prepareAccountArchievedEvent,
]);

exports.after = compose([
	createSuccessManagementLog
]);

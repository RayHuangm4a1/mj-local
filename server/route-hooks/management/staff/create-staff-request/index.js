const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const {
	createSuccessManagementLog,
} = require("../../common.after");
const {
	preparePlatform,
} = require('../../../platform');
const {
	prepareAccountArchievedEvent,
} = require("../../../event");
const {
	PLATFORM_PROJECTIONS,
} = require("../../../../services/platform.admin");
const {
	isValidSelectedRole,
} = require("../../staff.common");

exports.before = compose([
	validateRequestPayload,
	isValidSelectedRole,
	prepareManagementLog,
	preparePlatform(PLATFORM_PROJECTIONS.CREATE_STAFF_REQUIRED),
	prepareAccountArchievedEvent,
]);

exports.after = compose([
	createSuccessManagementLog
]);

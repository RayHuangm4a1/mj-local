const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const { preparePlatform } = require("../../../platform");
const preparePlays = require("./prepare-plays");
const {
	PLATFORM_PROJECTIONS,
} = require("../../../../services/platform.admin");
const { createSuccessManagementLog } = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	preparePlatform(PLATFORM_PROJECTIONS.BONUS),
	preparePlays,
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog
]);

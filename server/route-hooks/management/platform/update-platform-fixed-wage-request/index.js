const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const { preparePlatform } = require("../../../platform");
const validateFixedWageRange = require("./validate-fixed-wage-range");
const prepareManagementLog = require("./prepare-management-log");
const { createSuccessManagementLog } = require("../../common.after");
const {
	PLATFORM_PROJECTIONS,
} = require("../../../../services/platform.admin");

exports.before = compose([
	validateRequestPayload,
	preparePlatform(PLATFORM_PROJECTIONS.UPDATE_FIXED_WAGE_REQUIRED),
	validateFixedWageRange,
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog
]);

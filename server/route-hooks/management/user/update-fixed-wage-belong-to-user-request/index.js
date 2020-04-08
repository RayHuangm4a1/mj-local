const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const validateUserFixedWageRange = require("./validate-user-fixed-wage-range");
const {
	prepareManagedUserWithParent,
} = require("../../user.common");
const { preparePlatform } = require("../../../platform");
const { FIXED_WAGES_ONLY_PROJECTIONS } = require("../../../../stores/platform");
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	preparePlatform(FIXED_WAGES_ONLY_PROJECTIONS),
	prepareManagedUserWithParent,
	validateUserFixedWageRange,
	prepareManagementLog
]);

exports.after = compose([
	createSuccessManagementLog
]);

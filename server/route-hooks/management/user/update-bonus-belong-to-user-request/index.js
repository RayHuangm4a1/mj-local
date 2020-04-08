const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareDeltaBonus = require("./prepare-delta-bonus");
const validateIsDeltaBonusNotGreaterThanParent = require("./validate-is-delta-bonus-not-greater-than-parent");
const prepareManagementLog = require("./prepare-management-log");
const {
	BONUS_ONLY_PROJECTIONS,
} = require("../../../../stores/platform");
const {
	prepareManagedUserWithParent,
} = require("../../user.common");
const {
	createSuccessManagementLog,
} = require("../../common.after");
const {
	preparePlatform,
} = require("../../../platform");

exports.before = compose([
	preparePlatform(BONUS_ONLY_PROJECTIONS),
	validateRequestPayload,
	prepareDeltaBonus,
	prepareManagedUserWithParent,
	validateIsDeltaBonusNotGreaterThanParent,
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog
]);

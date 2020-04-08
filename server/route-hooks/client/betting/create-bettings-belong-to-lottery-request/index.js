const compose = require('compose-middleware').compose;
const { preparePlatform } = require("../../../platform");
const {
	PLATFORM_PROJECTIONS,
} = require("../../../../services/platform");
const { prepareActiveUser } = require("../../../user.common");
const {
	USER_PROJECTIONS,
} = require("../../../../services/user");
const validateRequestPayload = require("./validate-request-payload");
const validatePlatformBettingPolicy = require("./validate-platform-betting-policy");
const prepareBettingCreationHelper = require("./prepare-betting-creation-helper");
const prepareBettings = require("./prepare-bettings");
const { validateIsUserBetable } = require("../../../betting.common");
const { authenticateBetPassword } = require("../../../authentication");

exports.before = compose([
	validateRequestPayload,
	authenticateBetPassword,
	preparePlatform(PLATFORM_PROJECTIONS.BETTING),
	prepareActiveUser(USER_PROJECTIONS.BETTING),
	validateIsUserBetable,
	prepareBettingCreationHelper,
	prepareBettings,
	validatePlatformBettingPolicy,
]);

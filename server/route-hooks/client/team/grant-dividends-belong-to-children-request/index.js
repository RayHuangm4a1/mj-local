const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	authenticateFundsPassword,
} = require("../../../authentication");
const {
	validateIsTeamChildren,
} = require("../common");
const {
	validateUserType,
} = require("../../user/common");
const {
	USER_PROJECTIONS,
} = require("../../../../services/user");
const {
	PLATFORM_PROJECTIONS,
} = require("../../../../services/platform");
const {
	prepareActiveUser,
} = require("../../../user.common");
const {
	ENUM_USER_TYPE,
} = require("../../../../lib/enum");
const {
	preparePlatform,
} = require("../../../platform");
const preparePreviousDividendDuration = require("./prepare-previous-dividend-duration");
const prepareGrantableTeamDurationStats = require("./prepare-grantable-team-duration-stats");

exports.before = compose([
	validateRequestPayload,
	authenticateFundsPassword,
	validateIsTeamChildren,
	prepareActiveUser(USER_PROJECTIONS.TYPE),
	validateUserType([ENUM_USER_TYPE.ZHAOSHANG, ENUM_USER_TYPE.AGENT]),
	preparePlatform(PLATFORM_PROJECTIONS.DIVIDEND_DURATION),
	preparePreviousDividendDuration,
	prepareGrantableTeamDurationStats,
]);

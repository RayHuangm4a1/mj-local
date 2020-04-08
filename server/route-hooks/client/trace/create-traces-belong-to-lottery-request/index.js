const compose = require('compose-middleware').compose;
const { preparePlatform } = require("../../../platform");
const {
	TRACE_REQUIRED_PROJECTION,
} = require("../../../../stores/platform");
const { prepareActiveUser } = require("../../../user.common");
const {
	BETTING_REQUIRED_PROJECTION,
} = require("../../../../stores/user");
const validateRequestPayload = require("./validate-request-payload");
const validatePlatformTracePolicy = require("./validate-platform-trace-policy");
const prepareTraceCreationHelper = require("./prepare-trace-creation-helper");
const prepareTracesAndBettings = require("./prepare-traces-and-bettings");
const { validateIsUserBetable } = require("../../../betting.common");
const { authenticateBetPassword } = require("../../../authentication");

exports.before = compose([
	validateRequestPayload,
	authenticateBetPassword,
	preparePlatform(TRACE_REQUIRED_PROJECTION),
	prepareActiveUser(BETTING_REQUIRED_PROJECTION),
	validateIsUserBetable,
	prepareTraceCreationHelper,
	prepareTracesAndBettings,
	validatePlatformTracePolicy,
]);

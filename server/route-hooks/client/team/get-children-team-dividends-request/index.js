const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	setDefaultLimit,
	setDefaultPage,
} = require("../../../common");
const {
	preparePlatform,
} = require("../../../platform");
const {
	setDefaultDividendDurationId,
} = require("../../../dividend-duration");
const {
	DIVIDEND_DURATION_ONLY_PROJECTIONS,
} = require("../../../../stores/platform");
const { prepareChildIfQueried } = require("../common");
const setDefaultStatus = require("./set-default-status");

exports.before = compose([
	validateRequestPayload,
	setDefaultPage,
	setDefaultLimit(),
	preparePlatform(DIVIDEND_DURATION_ONLY_PROJECTIONS),
	prepareChildIfQueried,
	setDefaultDividendDurationId,
	setDefaultStatus,
]);

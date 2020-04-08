const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const validateChildrenFixedWageRange = require('./validate-children-fixed-wage-range');
const {
	preparePlatform,
} = require('../../../platform');
const {
	prepareActiveUserWithChild
} = require('../common');
const {
	PLATFORM_PROJECTIONS,
} = require("../../../../services/platform");
const {
	USER_PROJECTIONS,
} = require("../../../../services/user");

exports.before = compose([
	validateRequestPayload,
	prepareActiveUserWithChild(USER_PROJECTIONS.FIXED_WAGE),
	preparePlatform(PLATFORM_PROJECTIONS.FIXED_WAGES),
	validateChildrenFixedWageRange,
]);

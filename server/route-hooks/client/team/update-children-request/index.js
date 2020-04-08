const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const validateBonus = require("./validate-bonus");
const isChildrenFromMemberToAgent = require("./is-children-from-member-to-agent");
const {
	preparePlatform,
} = require("../../../platform");
const {
	PLATFORM_PROJECTIONS,
} = require("../../../../services/platform");
const {
	prepareActiveUserWithChild,
} = require("../common");
const {
	USER_PROJECTIONS,
} = require("../../../../services/user");

exports.before = compose([
	validateRequestPayload,
	preparePlatform(PLATFORM_PROJECTIONS.USER_CREATION),
	prepareActiveUserWithChild(USER_PROJECTIONS.TYPE_AND_DELTA_BONUS),
	validateBonus,
	isChildrenFromMemberToAgent
]);

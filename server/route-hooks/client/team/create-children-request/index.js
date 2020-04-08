const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const {
	validateUserType,
	isChildrenCreatable,
} = require('../../user/common');
const hasPermissionToSetChildrenBonus = require('./has-permission-to-set-children-bonus');
const {
	preparePlatform,
} = require('../../../platform');
const {
	prepareAccountArchievedEvent,
} = require('../../../event');
const {
	prepareActiveUser,
} = require('../../../user.common');
const {
	USER_PROJECTIONS,
} = require("../../../../services/user");
const {
	PLATFORM_PROJECTIONS,
} = require("../../../../services/platform");
const {
	ENUM_USER_TYPE,
} = require("../../../../lib/enum");

exports.before = compose([
	validateRequestPayload,
	preparePlatform(PLATFORM_PROJECTIONS.USER_CREATION),
	prepareActiveUser(USER_PROJECTIONS.TYPE_AND_DELTA_BONUS),
	isChildrenCreatable,
	validateUserType([ENUM_USER_TYPE.ZHAOSHANG, ENUM_USER_TYPE.AGENT]),
	hasPermissionToSetChildrenBonus,
	prepareAccountArchievedEvent,
]);

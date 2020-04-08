const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	validateIsTeamChildren,
} = require("../../team/common");
const {
	USER_PROJECTIONS,
} = require("../../../../services/user");
const {
	prepareActiveUser,
} = require("../../../user.common");
const {
	ENUM_USER_TYPE,
} = require("../../../../lib/enum");
const {
	validateUserType,
} = require("../../user/common");

exports.before = compose([
	validateRequestPayload,
	prepareActiveUser(USER_PROJECTIONS.TYPE),
	validateUserType([ENUM_USER_TYPE.ZHAOSHANG, ENUM_USER_TYPE.AGENT]),
	validateIsTeamChildren,
]);

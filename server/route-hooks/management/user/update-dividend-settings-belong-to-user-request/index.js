const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	prepareManagedUser,
	validateManagedUserType,
} = require("../../user.common");
const prepareManagementLog = require("./prepare-management-log");
const {
	createSuccessManagementLog,
} = require("../../common.after");
const {
	ENUM_USER_TYPE,
} = require("../../../../lib/enum");

exports.before = compose([
	validateRequestPayload,
	prepareManagedUser,
	validateManagedUserType([
		ENUM_USER_TYPE.AGENT,
		ENUM_USER_TYPE.MEMBER,
	]),
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

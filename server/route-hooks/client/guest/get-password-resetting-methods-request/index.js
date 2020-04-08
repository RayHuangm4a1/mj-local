const { compose } = require("compose-middleware");
const validateRequestPayload = require("./validate-request-payload");
const {
	prepareAccount,
	prepareActiveUserBelongToGuest,
} = require("../common");
const { USER_PROJECTIONS } = require("../../../../services/user");
const { validateCaptcha } = require("../../../captcha");

exports.before = compose([
	validateRequestPayload,
	validateCaptcha,
	prepareActiveUserBelongToGuest(USER_PROJECTIONS.ACCOUNT_ID),
	prepareAccount,
]);

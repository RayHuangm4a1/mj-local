const { compose } = require('compose-middleware');
const validateRequestPayload = require('./validate-request-payload');
const {
	validateCaptcha,
} = require('../../../captcha');
const {
	prepareActiveUserBelongToGuest,
	prepareAccount,
} = require("../common");
const { USER_PROJECTIONS } = require("../../../../services/user");
const isDefaultPasswordChanged = require("./is-default-password-changed");

exports.before = compose([
	validateRequestPayload,
	validateCaptcha,
	prepareActiveUserBelongToGuest(USER_PROJECTIONS.LOGIN_GEO_VALIDATION),
	prepareAccount,
	isDefaultPasswordChanged,
]);

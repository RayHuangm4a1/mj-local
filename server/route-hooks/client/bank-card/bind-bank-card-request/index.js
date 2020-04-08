const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareBank = require('./prepare-bank');
const preparePayer = require('./prepare-payer');
const {
	prepareActiveUser,
} = require('../../../user.common');
const {
	USER_PROJECTIONS,
} = require('../../../../services/user');

exports.before = compose([
	validateRequestPayload,
	prepareBank,
	prepareActiveUser(USER_PROJECTIONS.PAYER),
	preparePayer,
]);

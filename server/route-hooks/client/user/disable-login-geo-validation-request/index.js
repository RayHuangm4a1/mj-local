const { compose } = require('compose-middleware');
const validateRequestPayload = require('./validate-request-payload');
const {
	USER_PROJECTIONS,
} = require('../../../../services/user');
const {
	prepareActiveUser,
} = require('../../../user.common');
const {
	validateUserPayer
} = require('../common');

exports.before = compose([
	validateRequestPayload,
	prepareActiveUser(USER_PROJECTIONS.PAYER),
	validateUserPayer
]);

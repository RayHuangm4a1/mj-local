const { compose } = require('compose-middleware');
const { isUserPayerExisted } = require('../common');
const { prepareActiveUser } = require('../../../user.common');
const {
	USER_PROJECTIONS,
} = require('../../../../services/user');

exports.before = compose([
	prepareActiveUser(USER_PROJECTIONS.PAYER),
	isUserPayerExisted,
]);

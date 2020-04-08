const compose = require('compose-middleware').compose;
const {
	prepareActiveUser,
} = require('../../../user.common');
const {
	USER_PROJECTIONS,
} = require('../../../../services/user');

exports.before = compose([
	prepareActiveUser(USER_PROJECTIONS.LEVEL_ID),
]);

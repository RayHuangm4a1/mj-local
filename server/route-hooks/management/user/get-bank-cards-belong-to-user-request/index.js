const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	setDefaultSort,
} = require('../../../common');
const {
	prepareManagedUser,
} = require("../../user.common");

exports.before = compose([
	validateRequestPayload,
	setDefaultSort('activatedAt', 'desc'),
	prepareManagedUser,
]);

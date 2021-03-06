const { compose } = require('compose-middleware');
const validateRequestPayload = require('./validate-request-payload');
const {
	isGuestExisted
} = require("../common");

exports.before = compose([
	validateRequestPayload,
	isGuestExisted,
]);

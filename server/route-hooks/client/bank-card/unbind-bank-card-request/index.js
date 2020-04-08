const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const hasPreviousWithdrawalApplicationForms = require('./has-previous-withdrawal-application-forms');
const {
	authenticateFundsPassword,
} = require('../../../authentication');

exports.before = compose([
	validateRequestPayload,
	hasPreviousWithdrawalApplicationForms,
	authenticateFundsPassword,
]);

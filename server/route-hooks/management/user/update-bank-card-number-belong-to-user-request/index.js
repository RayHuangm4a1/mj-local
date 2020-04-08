const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const isBankCardBlocked = require('./is-bank-card-blocked');
const isBankCardAlreadyBound = require('./is-bank-card-already-bound');
const hasPreviousWithdrawalApplicationForms = require('./has-previous-withdrawal-application-forms');
const prepareBank = require('./prepare-bank');
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	isBankCardBlocked,
	isBankCardAlreadyBound,
	prepareManagementLog,
	hasPreviousWithdrawalApplicationForms,
	prepareBank,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

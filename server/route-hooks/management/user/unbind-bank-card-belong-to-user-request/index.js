const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const hasPreviousWithdrawalApplicationForms = require('./has-previous-withdrawal-application-forms');
const {
	prepareManagedUser,
} = require("../../user.common");
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	prepareManagedUser,
	prepareManagementLog,
	hasPreviousWithdrawalApplicationForms,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

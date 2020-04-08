const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareMergeRequiredDepositApplicationForms = require("./prepare-merge-required-deposit-application-forms");
const prepareManagementLog = require("./prepare-management-log");
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	prepareMergeRequiredDepositApplicationForms,
	prepareManagementLog,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

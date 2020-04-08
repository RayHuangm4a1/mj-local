const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require('./prepare-management-log');
const prepareBankCards = require('./prepare-bank-cards');
const {
	createSuccessManagementLog,
} = require("../../common.after");

exports.before = compose([
	validateRequestPayload,
	prepareManagementLog,
	prepareBankCards,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

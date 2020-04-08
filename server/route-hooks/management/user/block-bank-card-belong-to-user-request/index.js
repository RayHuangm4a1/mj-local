const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const prepareManagementLog = require("./prepare-management-log");
const prepareBankCard = require('./prepare-bank-card');
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
	prepareBankCard,
]);

exports.after = compose([
	createSuccessManagementLog,
]);

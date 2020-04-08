const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const {
	prepareActiveUser,
} = require('../../../user.common');
const {
	USER_PROJECTIONS,
} = require('../../../../services/user');
const {
	isUserPayerExisted,
} = require('../../user/common');
const isUserDepositable = require("./is-user-depositable");
const prepareActiveBankAccountWithLevels = require("./prepare-active-bank-account-with-levels");
const isUserLevelMatchedBankAccount = require("./is-user-level-matched-bank-account");
const isValidDepositAmount = require("./is-valid-deposit-amount");

exports.before = compose([
	validateRequestPayload,
	prepareActiveUser(USER_PROJECTIONS.DEPOSIT),
	isUserPayerExisted,
	isUserDepositable,
	prepareActiveBankAccountWithLevels,
	isUserLevelMatchedBankAccount,
	isValidDepositAmount,
]);

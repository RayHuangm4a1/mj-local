const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const isUserTransferable = require('./is-user-transferable');
const validateFundsPasswordAndGoogleTOTP = require("./validate-funds-password-and-google-totp");
const {
	prepareActiveUser,
	isUserFundsable,
} = require('../../../user.common');
const {
	couldNotTransferToSelf,
	prepareTransferRequiredReceiver,
} = require('../common');
const {
	isExceedMaxTransferAmountPerDay,
} = require('../../../wallet.common');
const {
	USER_PROJECTIONS,
} = require('../../../../services/user');

exports.before = compose([
	validateRequestPayload,
	couldNotTransferToSelf,
	prepareActiveUser(USER_PROJECTIONS.MIN),
	isUserTransferable,
	isUserFundsable,
	isExceedMaxTransferAmountPerDay,
	prepareTransferRequiredReceiver,
	validateFundsPasswordAndGoogleTOTP,
]);

const compose = require('compose-middleware').compose;
const validateRequestPayload = require('./validate-request-payload');
const hasPreviousWithdrawalApplicationFormsByUserId = require('./has-previous-withdrawal-application-forms-by-user-id');
const { preparePlatform } = require('../../../platform');
const prepareWithdrawalRequiredUser = require('./prepare-withdrawal-required-user');
const isUserWithdrawable = require('./is-user-withdrawable');
const { isUserFundsable } = require('../../../user.common');
const isBankCardWithdrawable = require('./is-bank-card-withdrawable');
const isLessThanMaxNumOfWithdrawalsPerDay = require('./is-less-than-max-num-of-withdrawals-per-day');
const isValidWithdrawalAmount = require('./is-valid-withdrawal-amount');
const isLessThanMaxWithdrawalAmountPerDay = require('./is-less-than-max-withdrawal-amount-per-day');
const { authenticateFundsPassword } = require('../../../authentication');
const { PLATFORM_PROJECTIONS } = require('../../../../services/platform');
const prepareFeeByPlatform = require('./prepare-fee-by-platform');

exports.before = compose([
	validateRequestPayload,
	hasPreviousWithdrawalApplicationFormsByUserId,
	preparePlatform(PLATFORM_PROJECTIONS.WITHDRAWAL_CREATION),
	prepareWithdrawalRequiredUser,
	isUserWithdrawable,
	isUserFundsable,
	isBankCardWithdrawable,
	isLessThanMaxNumOfWithdrawalsPerDay,
	isValidWithdrawalAmount,
	isLessThanMaxWithdrawalAmountPerDay,
	prepareFeeByPlatform,
	authenticateFundsPassword,
]);

const { RequestValidationError } = require("ljit-error");
const {
	TRACE_INVALID_REQUEST,
} = require('../../../../lib/error/code');
const {
	ENUM_WALLET_CODE,
} = require("../../../../lib/enum");
const {
	REBATE_PRECISION_MAX,
} = require("../../../betting.common");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("lotteryId").isSQLId();
	req.checkBody("walletCode").isInWalletCodes([ENUM_WALLET_CODE.PRIMARY]);
	req.checkBody("data").isArray().notEmpty();
	req.checkBody("data.*.playId").isSQLId();
	req.checkBody("data.*.betcontent").isString().notEmpty();
	req.checkBody("data.*.weizhi").isString();
	req.checkBody("data.*.rebate").isPrecision(REBATE_PRECISION_MAX).isPercentage();
	req.checkBody("data.*.amountPerBet").isAmountPerBet();
	req.checkBody("data.*.multiples").isArray().notEmpty();
	req.checkBody("data.*.multiples.*").isMultiple();
	req.checkBody("data.*.isTerminatedIfWin").isBoolean();

	if (!req.user.isBetCredentialsAuthenticated) {
		req.checkBody("password").isPassword();
	}

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(TRACE_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

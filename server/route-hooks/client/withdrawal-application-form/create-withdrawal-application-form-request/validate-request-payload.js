const { RequestValidationError } = require("ljit-error");
const {
	WITHDRAW_INVALID_REQUEST,
} = require('../../../../lib/error/code');
const {
	ENUM_WALLET_CODE,
} = require("../../../../lib/enum");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkBody("walletCode").isInWalletCodes([ENUM_WALLET_CODE.PRIMARY]);
	req.checkBody("bankCardId").isSQLId();
	req.checkBody("password").isPassword();
	req.checkBody("amount").isInt();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(WITHDRAW_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

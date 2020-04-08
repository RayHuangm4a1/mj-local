const {
	ENUM_WALLET_CODE,
} = require("../../../../lib/enum");
const {
	RequestValidationError,
} = require("ljit-error");
const {
	TEAM_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const MIN_DIVIDEND_GRANTED_AMOUNT = 0.0001;
const MAX_DIVIDEND_GRANTED_AMOUNT = 100000000;
const VALID_GRANTED_WALLET_CODES = [ENUM_WALLET_CODE.PRIMARY, ENUM_WALLET_CODE.SUPERVISION];

module.exports= function validateRequestPayload(req, res, next) {
	req.checkParams("childrenId").isSQLId();
	req.checkBody("walletCode").isInWalletCodes(VALID_GRANTED_WALLET_CODES);
	req.checkBody("amount").isFloat({ min: MIN_DIVIDEND_GRANTED_AMOUNT, max: MAX_DIVIDEND_GRANTED_AMOUNT });
	req.checkBody("password").isPassword();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(TEAM_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

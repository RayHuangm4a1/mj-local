const { RequestValidationError } = require("ljit-error");
const {
	DEPOSIT_INVALID_REQUEST,
} = require('../../../../lib/error/code');
const {
	ENUM_WALLET_CODE,
} = require("../../../../lib/enum");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("depositClassId").isSQLId();
	req.checkBody("bankAccountId").isSQLId();
	req.checkBody("amount").isInt();
	req.checkBody("walletCode").isInWalletCodes([ENUM_WALLET_CODE.PRIMARY]);

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(DEPOSIT_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.sanitizeParams("depositClassId").toInt();

	next();
};

const { RequestValidationError } = require("ljit-error");
const {
	ENUM_WALLET_CODE,
} = require('../../../../lib/enum');
const {
	WALLET_INVALID_REQUEST,
} = require('../../../../lib/error/code');

module.exports = function validateRequestPayload(req, res, next) {
	req.checkQuery("code").isInWalletCodes([ENUM_WALLET_CODE.PRIMARY]);
	req.checkQuery("balance.lt").isInt({ min: 0, max: 0 });
	req.checkQuery("page").optional().isPage();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(WALLET_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

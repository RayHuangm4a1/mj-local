const {
	RequestValidationError,
} = require("ljit-error");
const {
	PLATFORM_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const { DIVIDEND_SETTING_AMOUNT_RANGE } = require("../../../common");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkBody()
		.isLimitLengthArray({ min: 2, max: 15 })
		.isUniqueArrayItems("amount")
		.isSortedArrayItems("amount", "asc");
	req.checkBody("*.amount").isInt(DIVIDEND_SETTING_AMOUNT_RANGE);
	req.checkBody("*.ratio").isPrecision(2).isPercentage().not().isIn([100]);

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(PLATFORM_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

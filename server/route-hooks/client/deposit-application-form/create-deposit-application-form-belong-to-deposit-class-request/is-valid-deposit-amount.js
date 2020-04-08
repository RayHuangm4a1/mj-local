const {
	ForbiddenError,
} = require("ljit-error");
const {
	DEPOSIT_AMOUNT_OUT_OF_RANGE,
} = require("../../../../lib/error/code");
const {
	ENUM_BANK_ACCOUNT_RECEIVED_AMOUNT_TYPE: {
		RANGE,
	},
} = require("../../../../lib/enum");

module.exports = function isValidDepositAmount(req, res, next) {
	const {
		receivedAmountType, minReceivedAmount, maxReceivedAmount,
		fixedReceivedAmounts,
	} = res.locals.bankAccountWithLevels;

	if (receivedAmountType === RANGE) {
		req.checkBody("amount").isValidRangeDepositAmount({ minReceivedAmount, maxReceivedAmount });
	} else {
		req.checkBody("amount").isValidWhitelistDepositAmount({ fixedReceivedAmounts });
	}

	const errors = req.validationErrors();

	if (errors) {
		const error = new ForbiddenError(DEPOSIT_AMOUNT_OUT_OF_RANGE.MESSAGE, DEPOSIT_AMOUNT_OUT_OF_RANGE.CODE);

		return next(error);
	}

	next();
};

const { RequestValidationError } = require("ljit-error");
const { LEVEL_INVALID_REQUEST } = require("../../../../lib/error/code");
const {
	ENUM_FINANCIAL_LEVEL_STATUS,
	ENUM_FINANCIAL_LEVEL_ID,
} = require("../../../../lib/enum");
const VALID_LEVEL_IDS = Object.values(ENUM_FINANCIAL_LEVEL_ID).slice(0, 10);

module.exports = function validateRequestPayload(req, res, next) {
	req.sanitizeParams("levelId").toInt();

	const { levelId } = req.params;

	if (!VALID_LEVEL_IDS.includes(levelId)) {
		return next("route");
	}

	req.checkParams("levelId").isSQLId();
	req.checkBody("isBettingAmountGreaterThanDepositAmount").isBoolean();
	req.checkBody("description").optional();
	req.checkBody("status").isIn(Object.values(ENUM_FINANCIAL_LEVEL_STATUS));
	req.checkBody("withdrawalAmount").isInt({ min: 0 });
	req.checkBody("numOfWithdraws").isInt({ min: 0 });
	req.checkBody("bettingAmount").isInt({ min: 0 });
	req.checkBody("depositAmount").isInt({ min: 0 });
	req.checkBody("numOfDeposits").isInt({ min: 0 });
	req.checkBody("numOfRegisteredDays").isInt({ min: 0 });
	req.checkBody("registeredBefore").isTimestamp();
	req.checkBody("registeredAfter").isTimestamp();
	req.checkBody("name").isLevelName();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(LEVEL_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.body.status = parseInt(req.body.status);

	next();
};

const { RequestValidationError } = require("ljit-error");
const { LEVEL_INVALID_REQUEST } = require("../../../../lib/error/code");
const {
	ENUM_FINANCIAL_LEVEL_STATUS,
	ENUM_FINANCIAL_LEVEL_ID,
} = require("../../../../lib/enum");
const VALID_LEVEL_IDS = Object.values(ENUM_FINANCIAL_LEVEL_ID).slice(10, 20);

module.exports = function validateRequestPayload(req, res, next) {
	req.sanitizeParams("levelId").toInt();

	const { levelId } = req.params;

	if (!VALID_LEVEL_IDS.includes(levelId)) {
		return next("route");
	}

	req.checkParams("levelId").isSQLId();
	req.checkBody("name").isLevelName();
	req.checkBody("status").isIn(Object.values(ENUM_FINANCIAL_LEVEL_STATUS));

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(LEVEL_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.body.status = parseInt(req.body.status);

	next();
};

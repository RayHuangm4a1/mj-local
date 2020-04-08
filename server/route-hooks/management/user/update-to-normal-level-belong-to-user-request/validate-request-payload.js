const {
	RequestValidationError,
} = require("ljit-error");
const {
	USER_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const {
	ENUM_FINANCIAL_LEVEL_ID,
} = require('../../../../lib/enum');

const VALID_LEVEL_IDS = Object.values(ENUM_FINANCIAL_LEVEL_ID).slice(0, 10);

module.exports = function validateRequestPayload(req, res, next) {
	req.sanitizeParams("levelId").toInt();

	const { levelId } = req.params;

	if (!VALID_LEVEL_IDS.includes(levelId)) {
		return next('route');
	}

	req.checkParams("userId").isSQLId();
	req.checkParams("levelId").isSQLId();
	req.checkBody("levelExpiredAt").optional().after(new Date());

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

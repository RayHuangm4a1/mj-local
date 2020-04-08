const { RequestValidationError } = require('ljit-error');
const { LOTTERY_CLASS_INVALID_REQUEST } = require('../../../../lib/error/code');

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams('lotteryClassId').isSQLId();
	req.checkBody('status').isLotteryClassStatus();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(LOTTERY_CLASS_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};

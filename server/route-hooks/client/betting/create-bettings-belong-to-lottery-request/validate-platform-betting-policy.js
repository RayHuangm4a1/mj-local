const { RequestValidationError } = require("ljit-error");
const {
	EXCEEDED_MAX_ORDERS_PER_REQUEST,
} = require('../../../../lib/error/code');

/**
  * @param {object} res.locals.helper - betting creation helper instance.
  */
module.exports = function validatePlatformBettingPolicy(req, res, next) {
	const { maxOrdersPerRequest } = res.locals.platform.bettingPolicy;
	const bettings = res.locals.helper.getBettings();

	if (bettings.length > maxOrdersPerRequest) {
		const message = EXCEEDED_MAX_ORDERS_PER_REQUEST.MESSAGE.replace(/{AMOUNT}/, maxOrdersPerRequest);
		const error = new RequestValidationError(EXCEEDED_MAX_ORDERS_PER_REQUEST.CODE, [], message);

		return next(error);
	}

	next();
};

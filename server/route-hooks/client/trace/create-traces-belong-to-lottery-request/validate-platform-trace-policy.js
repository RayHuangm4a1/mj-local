const { RequestValidationError } = require("ljit-error");
const {
	EXCEEDED_MAX_AMOUNT_OF_TOTAL_TRACES_PER_REQUEST,
	EXCEEDED_MAX_ORDERS_PER_REQUEST,
} = require('../../../../lib/error/code');
const { sumBy } = require("ljit-collection");

/**
  * @param {object} res.locals.helper - trace creation helper instance.
  */
module.exports = function validatePlatformTracePolicy(req, res, next) {
	const {
		maxOrdersPerRequest,
		maxAmountOfTotalTracesPerRequest,
	} = res.locals.platform.bettingPolicy;
	const traces = res.locals.helper.getTraces();

	if (traces.length > maxOrdersPerRequest) {
		const message = EXCEEDED_MAX_ORDERS_PER_REQUEST.MESSAGE.replace(/{AMOUNT}/, maxOrdersPerRequest);
		const error = new RequestValidationError(EXCEEDED_MAX_ORDERS_PER_REQUEST.CODE, [], message);

		return next(error);
	}

	const totalAmount = sumBy(res.locals.helper.getTraces(), "amount");

	if (totalAmount > maxAmountOfTotalTracesPerRequest) {
		const message = EXCEEDED_MAX_AMOUNT_OF_TOTAL_TRACES_PER_REQUEST.MESSAGE.replace(/{AMOUNT}/, maxAmountOfTotalTracesPerRequest);
		const error = new RequestValidationError(EXCEEDED_MAX_AMOUNT_OF_TOTAL_TRACES_PER_REQUEST.CODE, [], message);

		return next(error);
	}

	next();
};

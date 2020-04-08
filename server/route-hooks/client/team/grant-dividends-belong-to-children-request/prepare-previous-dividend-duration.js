const {
	ForbiddenError,
} = require("ljit-error");
const {
	DIVIDEND_DURATION_PROJECTIONS,

	getDividendableDuration,
} = require("../../../../services/platform");
const {
	PREVIOUS_DIVIDEND_DURATION_NOT_FOUND,
} = require("../../../../lib/error/code");

module.exports = async function preparePreviousDividendDuration(req, res, next) {
	const { dividendDuration } = res.locals.platform;

	try {
		const dividendableDuration = await getDividendableDuration({
			duration: dividendDuration,
			projections: DIVIDEND_DURATION_PROJECTIONS.ID,
		});

		if (dividendableDuration === null) {
			throw new ForbiddenError(
				PREVIOUS_DIVIDEND_DURATION_NOT_FOUND.MESSAGE,
				PREVIOUS_DIVIDEND_DURATION_NOT_FOUND.CODE
			);
		}

		res.locals.previousDividendDuration = dividendableDuration;
	} catch (error) {
		return next(error);
	}

	next();
};

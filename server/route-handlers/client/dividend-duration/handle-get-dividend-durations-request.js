const {
	DIVIDEND_DURATION_PROJECTIONS,

	getLastDividendDurations,
} = require("../../../services/platform");

module.exports = async function handleGetDividendDurationsRequest(req, res, next) {
	const { dividendDuration } = res.locals.platform;

	try {
		const dividendDurations = await getLastDividendDurations({
			duration: dividendDuration,
			projections: DIVIDEND_DURATION_PROJECTIONS.MIN,
		});

		res.status(200).json(dividendDurations);
	} catch (error) {
		next(error);
	}
};

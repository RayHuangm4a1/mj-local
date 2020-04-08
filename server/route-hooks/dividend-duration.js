const {
	getLatestDividendDuration,
} = require("../services/platform");

async function setDefaultDividendDurationId(req, res, next) {
	const { durationId } = req.query;

	try {
		const { dividendDuration } = res.locals.platform;

		if (durationId === undefined) {
			const lastestDividendDuration = await getLatestDividendDuration({
				duration: dividendDuration,
			});

			req.query.durationId = lastestDividendDuration.id;
		}

		next();
	} catch (error) {
		next(error);
	}
}

module.exports = {
	setDefaultDividendDurationId,
};

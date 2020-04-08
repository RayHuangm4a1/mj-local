const {
	getPlatform,
} = require("../services/platform");

function preparePlatform(projections) {
	return async function (req, res, next) {
		try {
			res.locals.platform = await getPlatform({ projections });
		} catch (error) {
			return next(error);
		}

		next();
	};
}

module.exports = {
	preparePlatform,
};

const {
	updatePlatformHigherFixedWage,
	updatePlatformLowerFixedWage,
} = require("../../../services/platform.admin");

module.exports = async function handleUpdatePlatformFixedWageRequest(req, res, next) {
	const { fixedWage: currentFixedWage } = req.body;
	const { fixedWage: previousFixedWage } = res.locals.platform;

	try {
		if (currentFixedWage > previousFixedWage) {
			await updatePlatformHigherFixedWage(currentFixedWage);
		} else {
			await updatePlatformLowerFixedWage(currentFixedWage);
		}

		res.status(204).end();
	} catch (error) {
		return next(error);
	}

	next();
};

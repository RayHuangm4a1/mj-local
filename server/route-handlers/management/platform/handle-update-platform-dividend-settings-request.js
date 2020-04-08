const {
	setPlatformDividendSettings,
} = require("../../../services/platform.admin");

module.exports = async function handleUpdatePlatformDividendSettingsRequest(req, res, next) {
	const { dividendSettings } = res.locals;

	try {
		const updatedDividendSettings = await setPlatformDividendSettings(dividendSettings);

		res.status(200).json(updatedDividendSettings);

		next();
	} catch (error) {
		next(error);
	}
};

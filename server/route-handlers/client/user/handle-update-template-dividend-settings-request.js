const {
	upsertTemplateDividendSettingsByUserIdAndDividendSettings,
} = require("../../../services/dividend");

module.exports = async function handleUpdateTemplateDividendSettingsRequest(req, res, next) {
	const { id: userId } = req.user;
	const dividendSettings = req.body;

	try {
		await upsertTemplateDividendSettingsByUserIdAndDividendSettings(userId, dividendSettings);

		res.status(201).json(dividendSettings);
	} catch (error) {
		next(error);
	}
};

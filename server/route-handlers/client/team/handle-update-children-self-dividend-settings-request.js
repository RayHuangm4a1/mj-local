const {
	setSelfDividendSettingsByUserId,
} = require("../../../services/dividend");

module.exports = async function handleUpdateChildrenSelfDividendSettingsRequest(req, res, next) {
	const { childrenId } = req.params;
	const dividendSettings = req.body;

	try {
		await setSelfDividendSettingsByUserId(childrenId, dividendSettings);

		res.status(201).json(dividendSettings);
	} catch (error) {
		next(error);
	}
};

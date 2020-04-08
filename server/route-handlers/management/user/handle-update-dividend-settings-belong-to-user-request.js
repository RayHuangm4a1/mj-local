const {
	setSelfDividendSettingsByUserId,
} = require("../../../services/dividend");

module.exports = async function handleUpdateDividendSettingsBelongToUserRequest(req, res, next) {
	const { userId } = req.params;
	const dividendSettings = req.body;

	try {
		await setSelfDividendSettingsByUserId(userId, dividendSettings);

		res.status(200).json(dividendSettings);
	} catch (error) {
		return next(error);
	}

	next();
};

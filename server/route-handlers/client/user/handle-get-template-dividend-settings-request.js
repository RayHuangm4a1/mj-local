const {
	getUserDividendSettingsByUserIdAndType,
} = require("../../../services/dividend");
const {
	ENUM_DIVIDEND_TYPE,
} = require("../../../lib/enum");

module.exports = async function handleGetTemplateDividendSettingsRequest(req, res, next) {
	const { id } = req.user;

	try {
		const dividendSettings = await getUserDividendSettingsByUserIdAndType(id, ENUM_DIVIDEND_TYPE.TEMPLATE);

		res.status(200).json(dividendSettings);
	} catch (error) {
		next(error);
	}
};

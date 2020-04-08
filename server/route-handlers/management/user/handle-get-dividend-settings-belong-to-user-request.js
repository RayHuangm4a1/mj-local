const {
	ENUM_DIVIDEND_TYPE
} = require("../../../lib/enum");
const {
	getUserDividendSettingsByUserIdAndType,
} = require("../../../services/user.admin");

module.exports = async function handleGetDividendSettingsBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		const dividendSettings = await getUserDividendSettingsByUserIdAndType(userId, ENUM_DIVIDEND_TYPE.SELF);

		res.status(200).json(dividendSettings);
	} catch (error) {
		next(error);
	}
};

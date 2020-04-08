const {
	getUserDailyStatsByUserIdWalletCodeAndDates,
} = require("../../../services/stats");
const {
	ENUM_WALLET_CODE,
} = require("../../../lib/enum");

module.exports = async function handleGetUserDailyStatsRequest(req, res, next) {
	const { id: userId } = req.user;
	const { from, to } = req.query;

	try {
		const userDailyStats = await getUserDailyStatsByUserIdWalletCodeAndDates(
			userId,
			ENUM_WALLET_CODE.PRIMARY,
			from,
			to,
		);

		res.status(200).json(userDailyStats);
	} catch (error) {
		next(error);
	}
};

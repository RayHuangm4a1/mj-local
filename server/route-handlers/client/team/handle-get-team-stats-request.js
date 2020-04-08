const {
	getTeamStatsWithBonusStatsAndDailyStatsByUserIdAndWalletCode,
} = require("../../../services/stats");
const {
	ENUM_WALLET_CODE,
} = require("../../../lib/enum");

/**
 * @param {object} res.locals.user
 */
module.exports = async function handleGetTeamStatsRequest(req, res, next) {
	const { id: userId } = req.user;

	try {
		const teamStats = await getTeamStatsWithBonusStatsAndDailyStatsByUserIdAndWalletCode(userId, ENUM_WALLET_CODE.PRIMARY);

		res.status(200).json(teamStats);
	} catch (error) {
		next(error);
	}
};

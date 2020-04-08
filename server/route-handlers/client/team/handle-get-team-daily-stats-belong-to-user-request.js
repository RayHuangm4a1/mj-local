const {
	RELATIONSHIP_PROJECTIONS,

	getChildrenRelationshipsByUserId,
} = require("../../../services/user");
const {
	getTeamDailyStatsWithinUserIdsWalletCodeAndDates,
} = require("../../../services/stats");
const {
	getUserDailyStatsByUserIdWalletCodeAndDates,
} = require("../../../services/stats");
const {
	ENUM_WALLET_CODE,
} = require("../../../lib/enum");

module.exports = async function handleGetTeamDailyStatsBelongToUserRequest(req, res, next) {
	const {
		from,
		to,
	} = req.query;
	const {
		ancestorsOfQueriedDescendant: ancestors,
		queriedDescendant
	} = req;

	if (!ancestors.length || queriedDescendant === null) {
		return res.status(200).json({
			data: {
				stats: [],
				ancestors: [],
			},
		});
	}

	try {
		const children = await getChildrenRelationshipsByUserId(queriedDescendant.id, {
			projections: RELATIONSHIP_PROJECTIONS.USERID,
		});
		const childrenIds = children.map(({ userId }) => userId);

		const [userDailyStats, childrenTeamDailyStats] = await Promise.all([
			getUserDailyStatsByUserIdWalletCodeAndDates(
				queriedDescendant.id,
				ENUM_WALLET_CODE.PRIMARY,
				from,
				to
			),
			getTeamDailyStatsWithinUserIdsWalletCodeAndDates(
				childrenIds,
				ENUM_WALLET_CODE.PRIMARY,
				from,
				to
			),
		]);

		res.status(200).json({
			data: {
				stats: [...userDailyStats, ...childrenTeamDailyStats],
				ancestors,
			},
		});
	} catch (error) {
		next(error);
	}
};

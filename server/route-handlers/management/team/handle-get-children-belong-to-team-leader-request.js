const { getChildrenWithWalletsBankCardsAndTeamStatsByUserIdAndPagnation } = require("../../../services/user.admin");

module.exports = async function handleGetChildrenBelongToTeamLeaderRequest(req, res, next) {
	const { leaderId } = req.params;
	const { page, limit } = req.query;
	const { ancestorsOfTeamLeader: ancestors } = res.locals;

	try {
		const { children, numOfItems, numOfPages } = await getChildrenWithWalletsBankCardsAndTeamStatsByUserIdAndPagnation(
			leaderId,
			page,
			{
				limit,
			}
		);

		res.status(200).json({
			data: {
				children,
				ancestors,
			},
			numOfItems,
			numOfPages,
		});
	} catch (error) {
		return next(error);
	}
};

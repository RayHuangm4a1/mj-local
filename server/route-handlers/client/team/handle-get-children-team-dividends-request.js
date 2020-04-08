const {
	USER_PROJECTIONS,

	getChildrenWithDividendsByUserIdDurationIdAndPagination,
} = require("../../../services/user");

module.exports = async function handleGetChildrenTeamDividendsRequest(req, res, next) {
	const userId = req.user.id;
	const { durationId, status, page, sort, order, limit, username } = req.query;
	const { queriedChild } = res.locals;

	if (username && queriedChild === null) {
		return res.status(200).json({
			data: [],
			numOfPages: 0,
			numOfItems: 0,
		});
	}

	try {
		const childId = queriedChild ? queriedChild.id : null;
		const dividends = await getChildrenWithDividendsByUserIdDurationIdAndPagination(
			userId,
			durationId,
			page,
			{
				status,
				childId,
				limit,
				sort,
				order,
				projections: USER_PROJECTIONS.CHILDREN_DIVIDEND,
			}
		);

		res.status(200).json(dividends);
	} catch (error) {
		next(error);
	}
};

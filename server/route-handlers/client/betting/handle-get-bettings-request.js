const {
	BETTING_PROJECTIONS,
	getBettingsByUserIdDatesAndPagination,
} = require("../../../services/betting");

module.exports = async function handleGetBettingsRequest(req, res, next) {
	const { id: userId } = req.user;
	const {
		id, issue, lotteryId,
		status, from, to,
		page, limit, sort,
		order,
	} = req.query;

	try {
		const result = await getBettingsByUserIdDatesAndPagination(userId, from, to, page, {
			id,
			issue,
			lotteryId,
			status,
			limit,
			sort,
			order,
			projections: BETTING_PROJECTIONS.IGNORE_ANCESTORS_AND_AWARD,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

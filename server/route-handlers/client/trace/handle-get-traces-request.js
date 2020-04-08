const {
	getTracesByUserIdDatesAndPagination,
} = require("../../../services/betting");

module.exports = async function handleGetTracesRequest(req, res, next) {
	const { id: userId } = req.user;
	const {
		page, limit, id,
		lotteryId, from, to,
		sort, order, status,
	} = req.query;

	try {
		const result = await getTracesByUserIdDatesAndPagination(userId, from, to, page, {
			id,
			lotteryId,
			limit,
			sort,
			order,
			status,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

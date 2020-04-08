const {
	getTracesWithinUserIdsDatesAndPagination,

	TRACE_PROJECTIONS,
} = require("../../../services/betting");

module.exports = async function handleGetDescendantTracesRequest(req, res, next) {
	const { descendantIds } = res.locals;
	const {
		id, status, limit,
		sort, order, lotteryId,
		from, to, page,
	} = req.query;

	if (!descendantIds.length) {
		return res.status(200).json({
			data: [],
			numOfItems: 0,
			numOfPages: 0,
		});
	}

	try {
		const result = await getTracesWithinUserIdsDatesAndPagination(descendantIds, from, to, page, {
			id,
			lotteryId,
			limit,
			status,
			sort,
			order,
			projections: TRACE_PROJECTIONS.TRACES,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

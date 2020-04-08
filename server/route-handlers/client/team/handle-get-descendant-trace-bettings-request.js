const {
	getBettingsByUserIdTraceIdAndPagination,

	BETTING_PROJECTIONS,
} = require("../../../services/betting");

module.exports = async function handleGetDescendantTraceBettingsRequest(req, res, next) {
	const { memberId, traceId } = req.params;
	const { page, limit } = req.query;

	try {
		const result = await await getBettingsByUserIdTraceIdAndPagination(memberId, traceId, page, {
			limit,
			projections: BETTING_PROJECTIONS.DESCENDANT_TRACE_BETTINGS,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

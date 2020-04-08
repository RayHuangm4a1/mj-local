const {
	BETTING_PROJECTIONS,
	getBettingsByUserIdTraceIdAndPagination,
} = require("../../../services/betting");

module.exports = async function handleGetTraceBettingsRequest(req, res, next) {
	const { id: userId } = req.user;
	const { traceId } = req.params;
	const { page, limit } = req.query;

	try {
		const result = await getBettingsByUserIdTraceIdAndPagination(userId, traceId, page, {
			limit,
			projections: BETTING_PROJECTIONS.IGNORE_ANCESTORS_AND_AWARD,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

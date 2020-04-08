const {
	getBettingsByUserIdTraceIdAndPagination,
} = require("../../../services/betting");

module.exports = async function handleGetTraceBettingsRequest(req, res, next) {
	const { userId, traceId } = req.params;
	const { page, limit } = req.query;

	try {
		const result = await getBettingsByUserIdTraceIdAndPagination(userId, traceId, page, { limit });

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

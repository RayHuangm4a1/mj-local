const {
	DRAWING_PROJECTIONS,
	getDrawingsByLotteryId,
} = require("../../../services/lottery");

module.exports = async function handleGetDrawingsBelongToLotteryRequest(req, res, next) {
	const { lotteryId } = req.params;
	const { limit } = req.query;

	try {
		const drawings = await getDrawingsByLotteryId(
			lotteryId,
			{
				limit,
				projections: DRAWING_PROJECTIONS.MIN,
			},
		);

		res.status(200).json(drawings);
	} catch (error) {
		next(error);
	}
};

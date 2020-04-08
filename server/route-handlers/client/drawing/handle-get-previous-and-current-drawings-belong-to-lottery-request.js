const {
	getPrimaryPreviousAndCurrentDrawingsByLotteryId,
} = require("../../../services/lottery");

module.exports = async function handleGetPreviousAndCurrentDrawingsBelongToLotteryRequest(req, res, next) {
	const { lotteryId } = req.params;

	try {
		const drawings = await getPrimaryPreviousAndCurrentDrawingsByLotteryId(lotteryId, {
			requestId: req.header("X-Request-Id"),
		});

		res.status(200).json(drawings);
	} catch (error) {
		next(error);
	}
};

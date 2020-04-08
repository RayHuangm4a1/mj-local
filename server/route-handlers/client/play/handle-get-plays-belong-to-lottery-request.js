const {
	PLAY_PROJECTIONS,
	getPrimaryPlaysByLotteryId,
} = require("../../../services/lottery");

module.exports = async function handleGetPlaysBelongToLotteryRequest(req, res, next) {
	const { lotteryId } = req.params;
	const requestId = req.header("X-Request-Id");

	try {
		const plays = await getPrimaryPlaysByLotteryId(lotteryId, {
			requestId,
			projections: PLAY_PROJECTIONS.MIN,
		});

		res.status(200).json(plays);
	} catch (error) {
		next(error);
	}
};

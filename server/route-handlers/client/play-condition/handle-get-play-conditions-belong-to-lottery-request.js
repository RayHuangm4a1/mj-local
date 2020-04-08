const {
	getPrimaryPlayConditionsByLotteryId,
} = require('../../../services/lottery');

module.exports = async function handleGetPlayConditionsBelongToLotteryRequest(req, res, next) {
	const { lotteryId } = req.params;
	const requestId = req.header("X-Request-Id");

	try {
		const playConditions = await getPrimaryPlayConditionsByLotteryId(lotteryId, { requestId });

		res.status(200).json(playConditions);
	} catch (error) {
		next(error);
	}
};

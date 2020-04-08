const { getPrimaryPlayConditionsByLotteryIdAndPlayClassId } = require("../../../services/lottery.admin");

module.exports = async function handleGetPlayConditionsBelongToLotteryAndPlayClassRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { jwt } = req.user;
	const { lotteryId, playClassId } = req.params;

	try {
		const playConditions = await getPrimaryPlayConditionsByLotteryIdAndPlayClassId(lotteryId, playClassId, { requestId, jwt });

		res.status(200).json(playConditions);
	} catch (error) {
		next(error);
	}

};

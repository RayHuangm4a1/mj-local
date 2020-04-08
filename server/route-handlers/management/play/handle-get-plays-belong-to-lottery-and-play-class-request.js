const {
	getPrimaryPlaysByLotteryIdAndPlayClassId,
} = require("../../../services/lottery.admin");

module.exports = async function handleGetPlaysBelongToLotteryAndPlayClassRequest(req, res, next) {
	const { lotteryId, playClassId } = req.params;
	const { jwt } = req.user;
	const requestId = req.header("X-Request-Id");

	try {
		const plays = await getPrimaryPlaysByLotteryIdAndPlayClassId(lotteryId, playClassId, { jwt, requestId });

		res.status(200).json(plays);
	} catch (error) {
		next(error);
	}
};

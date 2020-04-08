const {
	updatePrimaryManyPlayDeltaBonusAndPKByLotteryId,
} = require("../../../services/lottery.admin");

module.exports = async function handleUpdateManyPlayDeltaBonusAndPKBelongToLotteryRequest(req, res, next) {
	const { lotteryId } = req.params;
	const requestId = req.header("X-Request-Id");
	const { jwt } = req.user;
	const { plays } = res.locals;

	try {
		await updatePrimaryManyPlayDeltaBonusAndPKByLotteryId(lotteryId, plays, { jwt, requestId });

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};

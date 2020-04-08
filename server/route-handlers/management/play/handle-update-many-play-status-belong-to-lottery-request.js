const {
	updatePrimaryManyPlayStatusByLotteryId,
} = require("../../../services/lottery.admin");

module.exports = async function handleUpdatePlaysBelongToLotteryRequest(req, res, next) {
	const { lotteryId } = req.params;
	const requestId = req.header("X-Request-Id");
	const { jwt } = req.user;
	const plays = req.body;

	try {
		await updatePrimaryManyPlayStatusByLotteryId(lotteryId, plays, { jwt, requestId });

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};

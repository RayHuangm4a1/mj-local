const {
	getPrimaryLotteriesByLotteryClassId,
} = require("../../../services/lottery.admin");

module.exports = async function handleGetLotteriesBelongToLotteryClassRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { jwt } = req.user;
	const { lotteryClassId } = req.params;

	try {
		const lotteries = await getPrimaryLotteriesByLotteryClassId(lotteryClassId, { requestId, jwt });

		res.status(200).json(lotteries);
	} catch (error) {
		next(error);
	}
};

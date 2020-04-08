const {
	getPrimaryLotteries,
} = require("../../../services/lottery.admin");

module.exports = async function handleGetLotteriesRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { jwt } = req.user;
	const { page } = req.query;

	try {
		const lotteries = await getPrimaryLotteries({ page, requestId, jwt });

		res.status(200).json(lotteries);
	} catch (error) {
		next(error);
	}
};

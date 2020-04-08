const {
	getPrimaryLotteries,
} = require("../../../services/lottery");

module.exports = async function handleGetLotteriesRequest(req, res, next) {
	try {
		const lotteries = await getPrimaryLotteries({
			requestId: req.header("X-Request-Id"),
		});

		res.status(200).json(lotteries);
	} catch (error) {
		next(error);
	}
};

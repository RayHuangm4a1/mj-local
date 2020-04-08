const {
	getPrimaryOnlineLotteryClasses,
} = require("../../../services/lottery");

module.exports = async function handleGetLotteryClassesRequest(req, res, next) {
	try {
		const lotteryClasses = await getPrimaryOnlineLotteryClasses({
			requestId: req.header("X-Request-Id"),
		});

		res.status(200).json(lotteryClasses);
	} catch (error) {
		next(error);
	}
};

const {
	getPrimaryLotteryClasses,
} = require("../../../services/lottery.admin");

module.exports = async function handleGetLotteryClassesRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { jwt } = req.user;

	try {
		const lotteryClasses = await getPrimaryLotteryClasses({
			jwt,
			requestId,
		});

		res.status(200).json(lotteryClasses);
	} catch (error) {
		next(error);
	}
};

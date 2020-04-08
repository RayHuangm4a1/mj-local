const {
	updatePrimaryLotteryClassStatusById,
} = require("../../../services/lottery.admin");

module.exports = async function handleUpdateLotteryClassStatusRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { jwt } = req.user;
	const { lotteryClassId } = req.params;
	const { status } = req.body;

	try {
		await updatePrimaryLotteryClassStatusById(lotteryClassId, status, {
			jwt,
			requestId,
		});

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};

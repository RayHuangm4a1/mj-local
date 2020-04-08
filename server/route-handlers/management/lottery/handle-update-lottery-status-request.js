const {
	updatePrimaryLotteryStatusById,
} = require("../../../services/lottery.admin");

module.exports = async function handleUpdateLotteryStatusRequest(req, res, next) {
	const requestId = req.header('X-Request-Id');
	const { jwt } = req.user;
	const { lotteryId } = req.params;
	const { status } = req.body;

	try {
		await updatePrimaryLotteryStatusById(lotteryId, status, {
			requestId,
			jwt,
		});

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};

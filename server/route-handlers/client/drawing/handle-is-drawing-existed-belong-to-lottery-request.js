const {
	isDrawingExistedByLotteryIdAndIssue,
} = require("../../../services/lottery");

module.exports = async function handleIsDrawingExistedBelongToLotteryRequest(req, res, next) {
	const { lotteryId, issue } = req.params;

	try {
		const isOpened = await isDrawingExistedByLotteryIdAndIssue(lotteryId, issue);

		if (isOpened) {
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	} catch (error) {
		next(error);
	}
};

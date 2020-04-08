const {
	isPrimaryNextDrawingOpeningByLotteryIdAndIssue,
} = require("../../../services/lottery");

module.exports = async function handleIsNextDrawingOpeningBelongToLotteryRequest(req, res, next) {
	const { lotteryId, issue } = req.params;
	const requestId = req.header("X-Request-Id");

	try {
		const isNextDrawingOpening = await isPrimaryNextDrawingOpeningByLotteryIdAndIssue(
			lotteryId,
			issue,
			{ requestId }
		);

		if (isNextDrawingOpening) {
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	} catch (error) {
		next(error);
	}
};

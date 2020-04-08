const {
	getPrimaryLessThanEqualCurrentDrawingsByLotteryId,
	getPrimaryLessThanIssueDrawingsByLotteryIdAndIssue,
} = require("../../../services/lottery.admin");

module.exports = async function handleGetDrawingsBelongToLotteryRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { lotteryId } = req.params;
	const issue = req.query.issue.lt;
	const { limit } = req.query;

	try {
		let drawings = [];

		if (issue === 0) {
			drawings = await getPrimaryLessThanEqualCurrentDrawingsByLotteryId(lotteryId, { limit, requestId });
		} else {
			drawings = await getPrimaryLessThanIssueDrawingsByLotteryIdAndIssue(lotteryId, issue, { limit, requestId });
		}

		res.status(200).json(drawings);
	} catch (error) {
		next(error);
	}
};

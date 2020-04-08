const {
	getDrawingByLotteryIdAndIssue,
} = require("../../../services/lottery.admin");
const {
	NotFoundError,
} = require("ljit-error");
const {
	DRAWING_NOT_FOUND,
} = require("../../../lib/error/code");

module.exports = async function handleGetDrawingBelongToLotteryAndIssueRequest(req, res, next) {
	const { lotteryId, issue } = req.params;

	try {
		const drawing = await getDrawingByLotteryIdAndIssue(lotteryId, issue);

		if (drawing === null) {
			throw new NotFoundError(DRAWING_NOT_FOUND.MESSAGE, DRAWING_NOT_FOUND.CODE);
		}

		res.status(200).json(drawing);
	} catch (error) {
		next(error);
	}
};

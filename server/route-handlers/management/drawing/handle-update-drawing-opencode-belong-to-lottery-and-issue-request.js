const {
	NotFoundError,
} = require("ljit-error");
const {
	setRenewableDrawingToModifyingByLotteryIdAndIssue,
} = require("../../../services/lottery.admin");
const {
	DRAWING_COULD_NOT_BE_UPDATED,
} = require("../../../lib/error/code");

module.exports = async function handleUpdateDrawingOpencodeBelongToLotteryAndIssueRequest(req, res, next) {
	const { lotteryId, issue } = res.locals.drawing;
	const { opencode } = req.body;

	try {
		const result = await setRenewableDrawingToModifyingByLotteryIdAndIssue(lotteryId, issue, opencode);

		if (result === null) {
			throw new NotFoundError(DRAWING_COULD_NOT_BE_UPDATED.MESSAGE, DRAWING_COULD_NOT_BE_UPDATED.CODE);
		}

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};

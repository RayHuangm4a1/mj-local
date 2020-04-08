const {
	NotFoundError,
} = require("ljit-error");
const {
	setCancelableDrawingToCancelingByLotteryIdAndIssue,
} = require("../../../services/lottery.admin");
const {
	DRAWING_COULD_NOT_BE_CANCELED,
} = require("../../../lib/error/code");

module.exports = async function handleCancelDrawingBelongToLotteryAndIssueRequest(req, res, next) {
	const { lotteryId, issue } = res.locals.drawing;

	try {
		const result = await setCancelableDrawingToCancelingByLotteryIdAndIssue(lotteryId, issue);

		if (result === null) {
			throw new NotFoundError(DRAWING_COULD_NOT_BE_CANCELED.MESSAGE, DRAWING_COULD_NOT_BE_CANCELED.CODE);
		}

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};

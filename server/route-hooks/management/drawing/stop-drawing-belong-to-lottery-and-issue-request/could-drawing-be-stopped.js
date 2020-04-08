const {
	getPrimaryCurrentDrawingByLotteryId,
	getPrimaryDrawingByLotteryIdAndIssue,
	getDrawingByLotteryIdAndIssue,
} = require('../../../../services/lottery.admin');
const {
	ForbiddenError,
} = require("ljit-error");
const {
	DRAWING_COULD_NOT_BE_STOPPED,
} = require('../../../../lib/error/code');

module.exports = async function couldDrawingBeStopped(req, res, next) {
	const requestId = req.header('X-Request-Id');
	const { lotteryId, issue } = req.params;

	try {
		const currentDrawing = await getPrimaryCurrentDrawingByLotteryId(lotteryId, { requestId });

		if (issue === currentDrawing.issue) {
			res.locals.drawing = currentDrawing;
		} else if (issue < currentDrawing.issue) {
			const drawing = await getDrawingByLotteryIdAndIssue(lotteryId, issue);

			if (drawing !== null) {
				throw new ForbiddenError(DRAWING_COULD_NOT_BE_STOPPED.MESSAGE, DRAWING_COULD_NOT_BE_STOPPED.CODE);
			}

			res.locals.drawing = await getPrimaryDrawingByLotteryIdAndIssue(lotteryId, issue, { requestId });
		} else {
			throw new ForbiddenError(DRAWING_COULD_NOT_BE_STOPPED.MESSAGE, DRAWING_COULD_NOT_BE_STOPPED.CODE);
		}
	} catch (error) {
		return next(error);
	}

	next();
};

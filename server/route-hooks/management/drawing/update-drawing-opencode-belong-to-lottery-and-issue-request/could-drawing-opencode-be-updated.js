const {
	getDrawingByLotteryIdAndIssue,
} = require('../../../../services/lottery.admin');
const {
	ForbiddenError,
} = require("ljit-error");
const {
	DRAWING_COULD_NOT_BE_UPDATED,
} = require('../../../../lib/error/code');
const {
	RENEWABLE_STATUSES,
} = require('../../../../lib/drawing');

module.exports = async function couldDrawingBeCanceled(req, res, next) {
	const { lotteryId, issue } = req.params;

	try {
		const drawing = await getDrawingByLotteryIdAndIssue(lotteryId, issue);

		if (drawing === null || !RENEWABLE_STATUSES.includes(drawing.status)) {
			throw new ForbiddenError(DRAWING_COULD_NOT_BE_UPDATED.MESSAGE, DRAWING_COULD_NOT_BE_UPDATED.CODE);
		}

		res.locals.drawing = drawing;
	} catch (error) {
		return next(error);
	}

	next();
};

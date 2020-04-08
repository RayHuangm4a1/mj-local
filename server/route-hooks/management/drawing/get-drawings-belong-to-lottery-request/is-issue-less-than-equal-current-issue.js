const { ForbiddenError } = require("ljit-error");
const { DRAWING_INVALID_QUERY_ISSUE } = require("../../../../lib/error/code");
const {
	getPrimaryCurrentDrawingByLotteryId,
} = require('../../../../services/lottery');

module.exports = async function isIssueLessThanEqualCurrentIssue(req, res, next) {
	const requestId = req.header('X-Request-Id');
	const { lotteryId } = req.params;
	const issue = req.query.issue.lt;

	if (issue !== 0) {
		try {
			const drawing = await getPrimaryCurrentDrawingByLotteryId(lotteryId, { requestId });

			if (issue > drawing.issue) {
				throw new ForbiddenError(DRAWING_INVALID_QUERY_ISSUE.MESSAGE, DRAWING_INVALID_QUERY_ISSUE.CODE);
			}
		} catch (error) {
			return next(error);
		}
	}

	next();
};

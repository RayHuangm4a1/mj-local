const Sequelize = require("sequelize");
const {
	ConflictError,
} = require("ljit-error");
const {
	createDrawing,
} = require("../../../services/lottery.admin");
const {
	DRAWING_DUPLICATED,
} = require("../../../lib/error/code");
const {
	ENUM_DRAWING_STATUS,
} = require("../../../lib/enum");

module.exports = async function handleStopDrawingBelongToLotteryAndIssueRequest(req, res, next) {
	const { lotteryId } = req.params;
	const {
		issue, index, startedAt,
		closedAt, openedAt,
	} = res.locals.drawing;

	try {
		const drawing = await createDrawing({
			lotteryId,
			issue,
			index,
			startedAt,
			closedAt,
			openedAt,
			isFetched: false,
			status: ENUM_DRAWING_STATUS.STOPPED,
		});

		res.status(201).json(drawing);

		next();
	} catch (error) {
		if (error instanceof Sequelize.UniqueConstraintError) {
			return next(
				new ConflictError(
					DRAWING_DUPLICATED.MESSAGE,
					DRAWING_DUPLICATED.CODE
				)
			);
		}

		next(error);
	}
};

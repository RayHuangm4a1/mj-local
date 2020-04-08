const {
	ENUM_DRAWING_STATUS,
} = require("../enum");

module.exports = function (lotteryId, drawingScheduleTimeTableRow, projections = []) {
	const emptyFieldsDrawing = projections.reduce((accumulator, key) => {
		accumulator[key] = null;

		return accumulator;
	}, {});

	emptyFieldsDrawing.lotteryId = lotteryId;

	if (emptyFieldsDrawing.income !== undefined) {
		emptyFieldsDrawing.income = 0;
	}

	if (emptyFieldsDrawing.expense !== undefined) {
		emptyFieldsDrawing.expense = 0;
	}

	if (emptyFieldsDrawing.status !== undefined) {
		emptyFieldsDrawing.status = ENUM_DRAWING_STATUS.NOT_OPENING;
	}

	return {
		...emptyFieldsDrawing,
		...drawingScheduleTimeTableRow,
	};
};

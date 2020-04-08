const LotteryClassStore = require("../stores/lottery-class");
const LotteryStore = require("../stores/lottery");
const PlayStore = require("../stores/play");
const DrawingStore = require("../stores/drawing");
const PlayConditionStore = require("../stores/play-condition");

module.exports = {
	// lottery class
	getPrimaryLotteryClasses: LotteryClassStore._getPrimaryLotteryClasses,
	updatePrimaryLotteryClassStatusById: LotteryClassStore._updatePrimaryLotteryClassStatusById,

	// lottery
	getPrimaryLotteries: LotteryStore._getPrimaryLotteries,
	getPrimaryLotteriesByLotteryClassId: LotteryStore._getPrimaryLotteriesByLotteryClassId,
	updatePrimaryLotteryStatusById: LotteryStore._updatePrimaryLotteryStatusById,
	updateTagsAndOrderingsOfPrimaryLotteriesByLotteryClassId: LotteryStore._updateTagsAndOrderingsOfPrimaryLotteriesByLotteryClassId,

	// play
	getPrimaryPlaysByLotteryIdAndPlayClassId: PlayStore._getPrimaryPlaysByLotteryIdAndPlayClassId,
	updatePrimaryManyPlayStatusByLotteryId: PlayStore._updatePrimaryManyPlayStatusByLotteryId,
	updatePrimaryManyPlayDeltaBonusAndPKByLotteryId: PlayStore._updatePrimaryManyPlayDeltaBonusAndPKByLotteryId,

	// play condition
	getPrimaryPlayConditionsByLotteryIdAndPlayClassId: PlayConditionStore._getPrimaryPlayConditionsByLotteryIdAndPlayClassId,

	// drawing
	createDrawing: DrawingStore.createDrawing,
	setCancelableDrawingToCancelingByLotteryIdAndIssue: DrawingStore.setCancelableDrawingToCancelingByLotteryIdAndIssue,
	setRenewableDrawingToModifyingByLotteryIdAndIssue: DrawingStore.setRenewableDrawingToModifyingByLotteryIdAndIssue,
	getDrawingsByLotteryIdAndPagination: DrawingStore.getDrawingsByLotteryIdAndPagination,
	getPrimaryLessThanEqualCurrentDrawingsByLotteryId: DrawingStore._getPrimaryLessThanEqualCurrentDrawingsByLotteryId,
	getPrimaryLessThanIssueDrawingsByLotteryIdAndIssue: DrawingStore._getPrimaryLessThanIssueDrawingsByLotteryIdAndIssue,
	getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId: DrawingStore.getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId,
	getPrimaryCurrentDrawingByLotteryId: DrawingStore.getPrimaryCurrentDrawingByLotteryId,
	getPrimaryDrawingByLotteryIdAndIssue: DrawingStore._getPrimaryDrawingByLotteryIdAndIssue,
	getDrawingByLotteryIdAndIssue: DrawingStore.getDrawingByLotteryIdAndIssue,
};

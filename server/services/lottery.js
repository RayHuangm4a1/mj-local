const LotteryClassStore = require("../stores/lottery-class");
const LotteryStore = require("../stores/lottery");
const PlayClassStore = require("../stores/play-class");
const PlayConditionStore = require("../stores/play-condition");
const PlayStore = require("../stores/play");
const DrawingStore = require("../stores/drawing");

module.exports = {
	getPrimaryOnlineLotteryClasses: LotteryClassStore.getPrimaryOnlineLotteryClasses,
	getPrimaryLotteries: LotteryStore.getPrimaryLotteries,
	getPrimaryLotteryById: LotteryStore.getPrimaryLotteryById,
	getPrimaryPlayClasses: PlayClassStore.getPrimaryPlayClasses,
	getPrimaryPlayConditionsByLotteryId: PlayConditionStore.getPrimaryPlayConditionsByLotteryId,
	getPrimaryPlaysByLotteryId: PlayStore.getPrimaryPlaysByLotteryId,
	getPrimaryPlaysByLotteryIdAndIds: PlayStore.getPrimaryPlaysByLotteryIdAndIds,
	getDrawingsByLotteryId: DrawingStore.getDrawingsByLotteryId,

	getPrimaryPreviousAndCurrentDrawingsByLotteryId: DrawingStore.getPrimaryPreviousAndCurrentDrawingsByLotteryId,
	getPrimaryCurrentDrawingByLotteryId: DrawingStore.getPrimaryCurrentDrawingByLotteryId,
	getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId: DrawingStore.getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId,
	isDrawingExistedByLotteryIdAndIssue: DrawingStore.isDrawingExistedByLotteryIdAndIssue,
	isPrimaryNextDrawingOpeningByLotteryIdAndIssue: DrawingStore.isPrimaryNextDrawingOpeningByLotteryIdAndIssue,
	isDrawingStoppedByLotteryIdAndIssue:  DrawingStore.isDrawingStoppedByLotteryIdAndIssue,

	PLAY_PROJECTIONS: {
		MIN: PlayStore.MIN_PROJECTIONS,
	},
	DRAWING_PROJECTIONS: {
		MIN: DrawingStore.MIN_PROJECTIONS,
	},
};

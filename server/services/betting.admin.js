const BettingStore = require("../stores/betting");
const TraceStore = require("../stores/trace");

module.exports = {
	getBettingsByLotteryIdDatesAndPagination: BettingStore.getBettingsByLotteryIdDatesAndPagination,
	getTracesByLotteryIdDatesAndPagination: TraceStore.getTracesByLotteryIdDatesAndPagination,
	getTracesByLotteryIdIssueDatesAndPagination: TraceStore.getTracesByLotteryIdIssueDatesAndPagination,
	countBettingUsersByLotteryIdAndIssue: BettingStore.countBettingUsersByLotteryIdAndIssue,
};

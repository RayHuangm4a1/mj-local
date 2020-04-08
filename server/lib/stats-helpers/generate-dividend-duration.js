const moment = require("moment");
const { generateStatsDateString } = require("../date");
const {
	formatDate,
} = require("ljit-lib/moment-utils");
// 分紅週期若為兩週結算一次，則第二週期的起始日固定為 16 號
const START_DAY_OF_SECOND_DIVIDEND_DURATION = 16;
const strategies = {
	half_month: calculateDividendDurationOfHalfMonth,
	one_month: calculateDividendDurationOfOneMonth,
};

function calculateDividendDurationOfOneMonth(date) {
	const statsDate = moment(generateStatsDateString(date));
	const startedAt = formatDate("YYYY-MM-DD", statsDate.startOf('month'));
	const closedAt = formatDate("YYYY-MM-DD", statsDate.endOf('month'));

	return {
		startedAt,
		closedAt,
	};
}

function calculateDividendDurationOfHalfMonth(date) {
	const statsDate = moment(generateStatsDateString(date));
	const day = statsDate.format("D");
	const isInFirstDividendDuration = day < START_DAY_OF_SECOND_DIVIDEND_DURATION;

	let startedAt, closedAt;

	if (isInFirstDividendDuration) {
		startedAt = formatDate("YYYY-MM-DD", statsDate.startOf('month'));
		closedAt = formatDate("YYYY-MM-DD", statsDate.startOf('month').add(14, 'day'));
	} else {
		startedAt = formatDate("YYYY-MM-DD", statsDate.startOf('month').add(15, 'day'));
		closedAt = formatDate("YYYY-MM-DD", statsDate.endOf('month'));
	}

	return {
		startedAt,
		closedAt,
	};
}

module.exports = function (date, duration = "half_month") {
	return strategies[duration](date);
};

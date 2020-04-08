const {
	getDateBeforeNDays,
} = require("../../lib/date");
const {
	generateDividendDuration,
} = require("../../lib/stats-helpers");
const {
	uniqWith, isEqual,
} = require("lodash");

let preparedDividendDurationds = [];

let dayOffset = 0;

do {
	const date = getDateBeforeNDays(dayOffset);
	const dividendDuration = generateDividendDuration(date);

	preparedDividendDurationds.push(dividendDuration);
	preparedDividendDurationds = uniqWith(preparedDividendDurationds, isEqual);

	dayOffset++;
} while (preparedDividendDurationds.length < 4);

module.exports = [
	// 前三週期
	{
		"id": 1,
		...preparedDividendDurationds[3],
	},
	// 前二週期
	{
		"id": 2,
		...preparedDividendDurationds[2],
	},
	// 前一週期
	{
		"id": 3,
		...preparedDividendDurationds[1],
	},
	// 當前週期
	{
		"id": 4,
		...preparedDividendDurationds[0],
	},
];

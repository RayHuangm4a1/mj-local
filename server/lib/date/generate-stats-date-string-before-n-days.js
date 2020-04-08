const {
	addDateByHours,
	addDateByDays,
	formatDateInAsiaShanghai,
} = require("ljit-lib/moment-utils");
// 每日凌晨 03:00 為報表一天的開始
const TIME_OFFSET_IN_HOURS = -3;

module.exports = function (date, days, format = "YYYY-MM-DD") {
	let statsAt = addDateByHours(TIME_OFFSET_IN_HOURS, date);

	statsAt = addDateByDays(-days, statsAt);

	return formatDateInAsiaShanghai(format, statsAt);
};

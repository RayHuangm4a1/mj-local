const {
	addDateByHours,
	formatDateInAsiaShanghai,
} = require("ljit-lib/moment-utils");
// 每日凌晨 03:00 為報表一天的開始
const TIME_OFFSET_IN_HOURS = -3;

module.exports = function (date, format = "YYYY-MM-DD") {
	const statsAt = addDateByHours(TIME_OFFSET_IN_HOURS, date);

	return formatDateInAsiaShanghai(format, statsAt);
};

const {
	formatDateInAsiaShanghai,
} = require("ljit-lib/moment-utils");
const DURATION_DAYS_MAPPING = {
	half_month: ["1", "16"],
	one_month: ["1"],
};

module.exports = function (dividendDuration) {
	const currentDate = new Date();
	const dayString = formatDateInAsiaShanghai("D", currentDate);

	return DURATION_DAYS_MAPPING[dividendDuration].includes(dayString);
};

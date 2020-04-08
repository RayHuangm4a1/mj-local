const moment = require("moment");
const MS_OF_A_DAY = 86400000;

module.exports = function () {
	const utc = moment.utc();
	let from;
	let to;

	if (utc.hour() < 19) {
		utc.set({
			hour: 19,
			minute: 0,
			second: 0,
			millisecond: 0,
		});
		to = utc.valueOf();
		from = to - MS_OF_A_DAY;
	} else {
		utc.set({
			hour: 19,
			minute: 0,
			second: 0,
			millisecond: 0,
		});
		from = utc.valueOf();
		to = from + MS_OF_A_DAY;
	}

	return {
		from: new Date(from),
		to: new Date(to),
	};
};

const moment = require("moment");

module.exports = function () {
	const currentDate = new Date();

	return moment(currentDate).subtract(1, "day").toDate();
};
const moment = require("moment");

module.exports = function (n) {
	const currentDate = new Date();

	return moment(currentDate).add(n, "days").toDate();
};

const moment = require("moment");

module.exports = function (n) {
	return moment().add(n, "seconds").toDate();
};

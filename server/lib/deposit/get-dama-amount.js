const Decimal = require("decimal.js");

module.exports = function getDamaAmount({ amount, percentageOfDama }) {
	return new Decimal(amount)
		.mul(percentageOfDama)
		.div(100)
		.toNumber();
};

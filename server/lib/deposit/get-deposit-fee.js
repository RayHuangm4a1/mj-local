const Decimal = require("decimal.js");

module.exports = function getDepositFee({ amount, percentageOfFee }) {
	return new Decimal(amount)
		.mul(percentageOfFee)
		.div(100)
		.toNumber();
};

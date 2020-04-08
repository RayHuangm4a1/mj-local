const Decimal = require("decimal.js");
const getDepositFee = require("./get-deposit-fee");

module.exports = function getDecreasedFeeDepositAmount({ amount, percentageOfFee }) {
	const depositFee = getDepositFee({ amount, percentageOfFee });

	return new Decimal(amount)
		.sub(depositFee)
		.toNumber();
};

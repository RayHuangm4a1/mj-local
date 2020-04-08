const DepositAmountModel = require("../models/deposit-amount");

function drop() {
	return DepositAmountModel.getInstance().sync({ force: true });
}

exports.drop = drop;

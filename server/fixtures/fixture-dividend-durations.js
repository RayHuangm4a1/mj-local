const DividendDurationModel = require("../models/dividend-duration");

function drop() {
	return DividendDurationModel.getInstance().sync({ force: true });
}

exports.drop = drop;

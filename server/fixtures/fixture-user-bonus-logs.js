const UserBonusLogModel = require("../models/user-bonus-log");

function drop() {
	return UserBonusLogModel.getInstance().sync({ force: true });
}

exports.drop = drop;

const UserLevelLogModel = require("../models/user-level-log");

function drop() {
	return UserLevelLogModel.getInstance().sync({ force: true });
}

exports.drop = drop;

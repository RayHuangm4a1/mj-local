const UserStatsModel = require("../models/user-stats");

function drop() {
	return UserStatsModel.getInstance().sync({ force: true });
}

exports.drop = drop;

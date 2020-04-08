const TeamStatsModel = require("../models/team-stats");

function drop() {
	return TeamStatsModel.getInstance().sync({ force: true });
}

exports.drop = drop;

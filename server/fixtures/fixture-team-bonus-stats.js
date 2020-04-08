const TeamBonusStatsModel = require("../models/team-bonus-stats");

function drop() {
	return TeamBonusStatsModel.getInstance().sync({ force: true });
}

exports.drop = drop;

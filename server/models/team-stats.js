const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/team-stats");
const model = require("ljit-db/model")(db, "team_stats", schema, indexes);
const TeamBonusStatsModel = require("./team-bonus-stats");
const TeamDailyStatsModel = require("./team-daily-stats");

module.exports = require("ljit-db/model/interface")(db, model);

model.hasMany(TeamBonusStatsModel.getInstance(), {
	constraints: false,
	as: "teamBonusStatses",
	sourceKey: "userId",
	foreignKey: "userId",
});

model.hasMany(TeamDailyStatsModel.getInstance(), {
	constraints: false,
	as: "teamDailyStatses",
	sourceKey: "userId",
	foreignKey: "userId",
});

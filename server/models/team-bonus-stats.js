const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/team-bonus-stats");
const model = require("ljit-db/model")(db, "team_bonus_stats", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/team-duration-stats");
const model = require("ljit-db/model")(db, "team_duration_stats", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

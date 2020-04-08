const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/user-stats");
const model = require("ljit-db/model")(db, "user_stats", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);
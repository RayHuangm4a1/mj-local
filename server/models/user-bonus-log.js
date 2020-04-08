const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/user-bonus-log");
const model = require("ljit-db/model")(db, "user_bonus_logs", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/user-dividend-setting");
const model = require("ljit-db/model")(db, "user_dividend_settings", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/user-favorite");
const model = require("ljit-db/model")(db, "user_favorites", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

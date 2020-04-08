const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/comment");
const model = require("ljit-db/model")(db, "comments", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

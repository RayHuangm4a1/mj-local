const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/level");
const model = require("ljit-db/model")(db, "levels", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

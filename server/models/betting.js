const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/betting");
const model = require("ljit-db/model")(db, "bettings", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);
const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/platform");
const model = require("ljit-db/model")(db, "platforms", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);
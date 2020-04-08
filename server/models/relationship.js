const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/relationship");
const model = require("ljit-db/model")(db, "relationships", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/role-relationship");
const model = require("ljit-db/model")(db, "role_relationships", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

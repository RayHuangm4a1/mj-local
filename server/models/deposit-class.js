const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/deposit-class");
const model = require("ljit-db/model")(db, "deposit_classes", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

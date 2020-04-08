const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/deposit-amount");
const model = require("ljit-db/model")(db, "deposit_amounts", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

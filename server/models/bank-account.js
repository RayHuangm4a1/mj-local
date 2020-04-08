const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/bank-account");
const model = require("ljit-db/model")(db, "bank_accounts", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/bank-card");
const model = require("ljit-db/model")(db, "bank_cards", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

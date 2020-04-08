const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/payment-account");
const model = require("ljit-db/model")(db, "payment_accounts", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

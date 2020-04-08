const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/wallet");
const model = require("ljit-db/model")(db, "wallets", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);
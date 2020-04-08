const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/user-withdrawal-policy");
const model = require("ljit-db/model")(db, "user_withdrawal_policies", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

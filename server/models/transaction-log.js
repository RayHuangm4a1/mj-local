const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/transaction-log");
const model = require("ljit-db/model")(db, "transaction_logs", schema, indexes);
const BettingModel = require("./betting");

model.hasOne(BettingModel.getInstance(), {
	constraints: false,
	as: "betting",
	sourceKey: "associateId",
	foreignKey: "id",
});

module.exports = require("ljit-db/model/interface")(db, model);

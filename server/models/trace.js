const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/trace");
const model = require("ljit-db/model")(db, "traces", schema, indexes);
const BettingModel = require("./betting");

model.hasMany(BettingModel.getInstance(), {
	constraints: false,
	as: "bettings",
	sourceKey: "id",
	foreignKey: "traceId",
});

module.exports = require("ljit-db/model/interface")(db, model);

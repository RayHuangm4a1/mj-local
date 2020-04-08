const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/user-daily-stats");
const RelationshipModel = require("./relationship");
const model = require("ljit-db/model")(db, "user_daily_stats", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

model.hasOne(RelationshipModel.getInstance(), {
	constraints: false,
	as: "root",
	sourceKey: "userId",
	foreignKey: "userId",
});

model.hasMany(RelationshipModel.getInstance(), {
	constraints: false,
	as: "ancestors",
	sourceKey: "userId",
	foreignKey: "userId",
});

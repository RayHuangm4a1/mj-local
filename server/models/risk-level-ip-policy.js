const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/risk-level-ip-policy");
const model = require("ljit-db/model")(db, "risk_level_ip_polices", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

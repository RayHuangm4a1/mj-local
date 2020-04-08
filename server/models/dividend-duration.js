const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/dividend-duration");
const model = require("ljit-db/model")(db, "dividend_durations", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/remit-channel");
const model = require("ljit-db/model")(db, "remit_channels", schema, indexes);

module.exports = require("ljit-db/model/interface")(db, model);

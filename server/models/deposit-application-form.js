const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/deposit-application-form");
const model = require("ljit-db/model")(db, "deposit_application_forms", schema, indexes);
const bankAccountModel = require("./bank-account");
const depositClassModel = require("./deposit-class");

model.belongsTo(bankAccountModel.getInstance(), {
	constraints: false,
	as: "bankAccount",
	// TODO: add foreignKey & targetKey
});
model.belongsTo(depositClassModel.getInstance(), {
	constraints: false,
	as: "depositClass",
	// TODO: add foreignKey & targetKey
});

module.exports = require("ljit-db/model/interface")(db, model);

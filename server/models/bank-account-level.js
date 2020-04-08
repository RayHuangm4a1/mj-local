const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/bank-account-level");
const BankAccountLevelModel = require("ljit-db/model")(db, "bank_account_level", schema, indexes);
const LevelModel = require("./level").getInstance();
const BankAccountModel = require("./bank-account").getInstance();

LevelModel.belongsToMany(BankAccountModel, {
	through: BankAccountLevelModel,
	constraints: false,
	foreignKey: "levelId",
	otherKey: "bankAccountId",
	as: "bankAccounts",
});

BankAccountModel.belongsToMany(LevelModel, {
	through: BankAccountLevelModel,
	constraints: false,
	foreignKey: "bankAccountId",
	otherKey: "levelId",
	as: "levels",
});

module.exports = require("ljit-db/model/interface")(db, BankAccountLevelModel);

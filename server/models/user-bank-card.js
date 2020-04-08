const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/user-bank-card");
const UserBankCardModel = require("ljit-db/model")(db, "user_bank_card", schema, indexes);
const UserModel = require("./user").getInstance();
const BankCardModel = require("./bank-card").getInstance();

UserModel.belongsToMany(BankCardModel, {
	through: {
		model: UserBankCardModel,
		unique: false,
	},
	constraints: false,
	foreignKey: "userId",
	otherKey: "bankCardId",
	as: "bankCards",
});

BankCardModel.belongsToMany(UserModel, {
	through: {
		model: UserBankCardModel,
		unique: false,
	},
	constraints: false,
	foreignKey: "bankCardId",
	otherKey: "userId",
	as: "users",
});

module.exports = require("ljit-db/model/interface")(db, UserBankCardModel);

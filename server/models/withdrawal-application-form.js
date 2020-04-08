const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/withdrawal-application-form");
const model = require("ljit-db/model")(db, "withdrawal_application_forms", schema, indexes);
const PaymentAccountModel = require("./payment-account");

model.hasOne(PaymentAccountModel.getInstance(), {
	constraints: false,
	as: "paymentAccount",
	sourceKey: "paymentAccountId",
	foreignKey: "id",
});

module.exports = require("ljit-db/model/interface")(db, model);

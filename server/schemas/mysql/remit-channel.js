const Sequelize = require("sequelize");
const {
	ENUM_REMIT_CHANNEL_STATUS,
	ENUM_PAYMENT_CLASS_ID,
} = require("../../lib/enum");

const schema = {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	paymentClassId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_PAYMENT_CLASS_ID),
			],
		},
	},
	paymentAccountId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	paymentAccountName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	// TODO 新增自動出款通道的時候，要檢查最大限制金額和最小限制金額不能超過單筆出款限制
	minAutoRemitAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	maxAutoRemitAmount: {
		type: Sequelize.DECIMAL(11, 4),
		allowNull: false,
		defaultValue: 0,
	},
	blockedBankIds: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: [],
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_REMIT_CHANNEL_STATUS),
			],
		},
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["status", "minAutoRemitAmount"],
		},

		{
			unique: false,
			fields: ["status", "maxAutoRemitAmount"],
		},
	]
};

module.exports = {
	schema,
	indexes,
};

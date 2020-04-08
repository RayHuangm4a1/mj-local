const Sequelize = require("sequelize");
const {
	ENUM_BANK_CARD_STATUS,
} = require("../../lib/enum");

const schema = {
	bankId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	bankName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	number: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: ENUM_BANK_CARD_STATUS.ACTIVE,
		validate: {
			isIn: [
				Object.values(ENUM_BANK_CARD_STATUS),
			],
		},
	},

	// 被加入黑名單時才會使用的欄位
	blockedPayer: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	operatorId: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	operatorUsername: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	blockedAt: {
		type: Sequelize.DATE,
		allowNull: true,
	},
};

const indexes = {
	indexes:[
		{
			unique: true,
			fields: ['number'],
		},
		{
			unique: false,
			fields: ['status', 'number'],
		},
		{
			unique: false,
			fields: ['blockedPayer', 'number'],
		},
		{
			unique: false,
			fields: ['bankId', 'number'],
		},
	]
};

module.exports = {
	schema,
	indexes,
};

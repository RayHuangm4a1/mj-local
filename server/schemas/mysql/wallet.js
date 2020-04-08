const Sequelize = require("sequelize");
const {
	ENUM_WALLET_TYPE,
	ENUM_WALLET_CODE,
} = require("../../lib/enum");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		/*
			彩票錢包 / 監管錢包...
		*/
	},
	type: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_WALLET_TYPE),
			],
		},
	},
	code: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_WALLET_CODE),
			],
		},
	},
	balance: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: false,
		// TODO: alpha
		defaultValue: 1000000,
		// TODO: production
		// defaultValue: 0,
	},
	isUsed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
};

const indexes = {
	indexes:[
		{
			unique: true,
			fields: ["userId", "code"]
		},
		{
			unique: false,
			fields: ["code", "balance"]
		},
	]
};

module.exports = {
	schema,
	indexes,
};
